/* global modelDescriptor, _, data_test, datas_to_transpose */

var ModelManager = function () {

    var firstPassObject = [];

    var objectsIndex = [];
    var itemsById = [];
    var usedIn = [];
    var mmanager = this;

    var COLLECTION = "collection";
    var ENUMERATION = "enumeration";
    var VARIABLE = "variable";
    var OBJECTTYPE = "object_type";
    var FINAL = "final";

    _.each(modelDescriptor, function (objectDesc, key) {
        if (objectDesc.indexable === true) {
            if (!objectsIndex[key]) {
                objectsIndex[key] = {};
            }

            firstPassObject[key] = {};
        }
    });


    function getDescriptor(type) {
        return modelDescriptor[type];
    }

    function getReferencedItem(itemType, id) {
        return objectsIndex[itemType][id];
    }

    function setItem(itemType, id, item) {
        if (objectsIndex[itemType][id]) {
            console.log("Impossible d'indexer un objet qui est déjà référencé : " + id);
            return false;
        } else {
            objectsIndex[itemType][id] = item;
            console.log("Indexation de l'objet " + itemType + " : " + id);
            return true;
        }
    }


    this.getUsedInMapIndex = function (itemId, usedInMap) {
        if (usedIn[itemId]) {
            _.each(usedIn[itemId], function (uitem) {
                usedInMap.push(uitem);
                mmanager.getUsedInMapIndex(uitem, usedInMap);
            });
        }
    };


    this.firstPassLoading = function (model) {
        _.each(model, function (group, groupName) {
            firstPassObject[groupName] = [];

            _.each(group, function (item) {
                firstPassObject[groupName][item.id] = item;
            });
        });
    };


    this.addItem = function (itemType, id, item, firstPass) {

        var itemDescriptor = getDescriptor(itemType);

        if (itemDescriptor === undefined) {
            console.log("Type d'objet inconnu : " + itemType);
            return null;
        }

        item.itemType = itemType;
        item.itemId = id;

        var itemsToRegister = [];
        var isValid = validateObject(itemType, id, item, item, itemsToRegister, firstPass);

        _.each(itemsToRegister, function (itemId) {
            if (!usedIn[itemId]) {
                usedIn[itemId] = [];
            }

            usedIn[itemId].push(id);
        });

        if (isValid) {
            if (itemDescriptor.indexable) {
                setItem(itemType, id, item);
                itemsById[id] = item;
            }
        } else {
            console.log("Modèle de l'objet non conforme : " + id);
        }
    };

    this.removeItem = function (itemId) {
        var item = itemsById[itemId];

        delete (itemsById[itemId]);
        delete (objectsIndex[item.itemType][itemId]);

    };

    function isItemInIndex(objectType, id, firstPass) {
        if (!firstPass) {
            return (objectsIndex[objectType][id] !== undefined);
        } else {
            return (firstPassObject[objectType][id] !== undefined);
        }

    }

    function getCollectionType(prop) {
        return prop.split("Collection:")[1];
    }

    function getPropertyType(prop) {
        //attention, ici l'ordre des tests est important, car une collection est aussi une string dans le descripteur

        if ((typeof prop) === "boolean") {
            return null;
        }

        if (!_.isObject(prop) && prop.lastIndexOf("Collection:") !== -1) {
            return COLLECTION;
        }

        if (_.isArray(prop)) {
            return ENUMERATION;
        }

        if (_.isObject(prop) && !_.isArray(prop)) {
            return VARIABLE;
        }

        if (prop === "String" || prop === "Number" || prop === "Boolean") {
            return FINAL;
        }

        if ((typeof prop) === "string") {
            return OBJECTTYPE;
        }

        return null;
    }


    function isPropertyTypeOptional(pType) {
        return (typeof pType) === "string" && pType.lastIndexOf(":optional") !== -1;
    }


    function convertCollectionToTypedArray(type, collection) {
        var arr = [];

        _.each(collection, function (collectionItem) {
            var obj = {};
            obj[type] = collectionItem;
            arr.push(obj);
        });

        return arr;
    }


    function flatten(descriptorToFlatten, item, destObject) {
        for (var descKey in descriptorToFlatten) {
            var descProp = descriptorToFlatten[descKey];

            if (getPropertyType(descProp) === VARIABLE) {
                var itemValue = item[descKey];

                if (itemValue && descriptorToFlatten[descKey][itemValue]) {
                    if (!flatten(descriptorToFlatten[descKey][itemValue], item, destObject)) {
                        return false;
                    }
                } else {
                    console.warn("impossible de faire un flatten de propriété variable sur le descripteur");
                    return false;
                }
            } else {
                destObject[descKey] = descProp;
            }
        }

        return true;
    }


    function validateObject(itemType, id, item, baseitem, itemsToRegister, firstPass) {
        var itemDescriptor = getDescriptor(itemType);

        var flattenDesc = {};

        if (!flatten(itemDescriptor, item, flattenDesc)) {
            console.log("ici");
            return false;
        }

        // on teste chacune des propriétés du descriptor
        for (var descriptorPropertyKey in flattenDesc) {

            var descriptorPropertyType = flattenDesc[descriptorPropertyKey];

            var pType = getPropertyType(descriptorPropertyType);
            
            // vérifier de manière globale toutes les utilisations de isOptional
            var isOptional = isPropertyTypeOptional(descriptorPropertyType);

            if (isOptional) {
                descriptorPropertyType = descriptorPropertyType.replace(":optional", "");
            }



            if (descriptorPropertyKey !== "indexable" && descriptorPropertyKey !== "id") {

                // on commence déjà par verifier si une propriété avec le même nom existe dans l'item
                // sauf dans le cas des énumérations
                if (pType !== ENUMERATION && !item[descriptorPropertyKey] && item[descriptorPropertyKey] !== 0 && item[descriptorPropertyKey] !== false && !isOptional) {
                    console.warn("propriété introuvable dans l'objet " + id + " : " + descriptorPropertyKey);
                    return false;
                }

                var collection = [];


                switch (pType) {
                    case COLLECTION:
                        descriptorPropertyType = getCollectionType(descriptorPropertyType);

                        if (!_.isArray(item[descriptorPropertyKey])) {
                            console.log("la collection doit être un array");
                            return false;
                        }

                        collection = convertCollectionToTypedArray(descriptorPropertyKey, item[descriptorPropertyKey]);
                        break;

                    default:
                        collection.push(item);
                }



                var propertyDescriptor = getDescriptor(descriptorPropertyType);


                for (var i = 0; i < collection.length; i++) {

                    var collectionItem = collection[i];

                    if (pType !== ENUMERATION && propertyDescriptor.indexable) {
                        // on teste si l'object cible existe dans l'index
                        if (!isItemInIndex(descriptorPropertyType, collectionItem[descriptorPropertyKey], firstPass) && !isOptional) {
                            console.warn("objet " + id + " : objet cible introuvable " + descriptorPropertyKey + " de type " + descriptorPropertyType);
                            return false;
                        } else {
                            // à revoir, erreur systématique
                            //itemsToRegister.push(collectionItem[descriptorPropertyKey]);
                        }
                    } else {
                        // on teste la conformité de la propriété

                        switch (pType) {
                            case FINAL:
                                var tp = typeof collectionItem[descriptorPropertyKey];

                                if (!(tp === descriptorPropertyType.toLowerCase())) {
                                    console.log("non conformité de type");
                                    return false;
                                }
                                break;

                            case ENUMERATION:
                                if (descriptorPropertyType.lastIndexOf(collectionItem) === -1) {
                                    console.log("Enumération: l'objet cible ne fait pas partie des valeurs énumérées");
                                    return false;
                                }
                                break;

                            default:
                                if (!(isOptional && !collectionItem[descriptorPropertyKey]) && !validateObject(descriptorPropertyType, id, collectionItem[descriptorPropertyKey], baseitem, null, firstPass)) {
                                    console.log("erreur sur la récursion");
                                    return false;
                                }
                        }
                    }
                }
            }
        }

        return true;
    }


    this.loadFromJSON = function (jsonFile, callback) {
        $.getJSON(jsonFile, function (data) {
            callback(data);
        });
    };


    this.loadModel = function (model) {
        _.each(model, function (groupContent, groupKey) {
            _.each(groupContent, function (item) {
                mmanager.addItem(groupKey, item.id, item);
            });
        });
    };


    this.loadModelGroup = function (model, groupName) {
        _.each(model[groupName], function (item) {
            mmanager.addItem(groupName, item.id, item, true);
        });
    };


    this.save = function (model, filename, callback) {
        var save_url = "http://127.0.0.1/models/enreg.php";
        var data_test_ser = JSON.stringify(model);

        var data = {
            model: data_test_ser,
            filename: filename
        };

        $.post(save_url, data, function (dat) {
            if (callback) {
                callback(model);
            }
        });
    };


    this.renameAttribute = function (model, groupName, oldName, newName) {
        _.each(model[groupName], function (item) {
            item[newName] = item[oldName];
            delete item[oldName];
        });
    };


    this.createNewKey = function (model, groupName, keyName, value) {
        _.each(model[groupName], function (item) {
            item[keyName] = value;
        });
    };


    this.applyToKeyValue = function (model, groupName, keyName, applyFunction) {
        _.each(model[groupName], function (item) {
            item[keyName] = applyFunction(item[keyName]);
        });
    };


    this.deleteKey = function (model, groupName, keyName) {
        _.each(model[groupName], function (item) {
            delete item[keyName];
        });
    };


    this.duplicateGroup = function (model, groupName, newGroupName) {
        var duplicated = [];

        _.each(model[groupName], function (item) {
            duplicated.push(_.clone(item));
        });

        model[newGroupName] = duplicated;
    };


    this.deleteGroup = function (model, groupName) {
        delete model[groupName];
    };


    this.renameGroup = function (model, groupName, newGroupName) {
        model[newGroupName] = model[groupName];
        delete model[groupName];
    };


    function transpose() {
        // transposition de l'ancien modèle vers le nouveau

        // SoundFileReference
        mmanager.renameGroup(datas_to_transpose, "sounds", "SoundFileReference");
        mmanager.createNewKey(datas_to_transpose, "SoundFileReference", "package", "base");

        // SpriteFileReference
        mmanager.duplicateGroup(datas_to_transpose, "sprites", "SpriteFileReference");
        mmanager.deleteKey(datas_to_transpose, "SpriteFileReference", "x");
        mmanager.deleteKey(datas_to_transpose, "SpriteFileReference", "y");
        mmanager.renameAttribute(datas_to_transpose, "SpriteFileReference", "type", "file");
        mmanager.createNewKey(datas_to_transpose, "SpriteFileReference", "package", "base");

        // DecorationFileReference
        mmanager.renameAttribute(datas_to_transpose, "DecorationFileReference", "type", "file");

        // Sprite
        mmanager.renameGroup(datas_to_transpose, "sprites", "Sprite");

        // Group
        mmanager.renameGroup(datas_to_transpose, "groups", "SpritesGroup");

        // Variable
        mmanager.renameGroup(datas_to_transpose, "variables", "Variable");

        // GroupState
        mmanager.renameGroup(datas_to_transpose, "groupstates", "GroupState");

        // ConditionalGroupState
        mmanager.renameGroup(datas_to_transpose, "conditionalgroupstates", "ConditionalGroupState");
        mmanager.renameAttribute(datas_to_transpose, "ConditionalGroupState", "default", "defaultstate");

        // Condition
        mmanager.renameGroup(datas_to_transpose, "conditions", "Condition");

        // Action
        mmanager.renameGroup(datas_to_transpose, "actions", "Action");

        // Module
        mmanager.renameGroup(datas_to_transpose, "modules", "Module");

        // Trigger
        mmanager.renameGroup(datas_to_transpose, "triggers", "Trigger");

        // Sequence
        mmanager.renameGroup(datas_to_transpose, "sequences", "Sequence");

        // ControlSprite
        mmanager.renameGroup(datas_to_transpose, "controls", "ControlSprite");

        // Control
        mmanager.renameGroup(datas_to_transpose, "controlsb", "Control");

        // Background
        mmanager.renameGroup(datas_to_transpose, "background", "Background");

        // Foreground
        mmanager.renameGroup(datas_to_transpose, "foreground", "Foreground");

        mmanager.save(datas_to_transpose, "new_model.json", onSaved);

        /*mmanager.renameAttribute(data_test, "SpriteFileReference", "type", "file");
         mmanager.createNewKey(data_test, "SpriteFileReference", "package", "temp");
         mmanager.createNewKey(data_test, "SoundFileReference", "package", "temp");*/
        //mmanager.save(data_test, "new_model.json", onSaved);
    }


    function onSaved(model) {

        //return;
        mmanager.firstPassLoading(model);

        mmanager.loadModelGroup(model, "SoundFileReference");
        mmanager.loadModelGroup(model, "SpriteFileReference");
        mmanager.loadModelGroup(model, "DecorationFileReference");
        mmanager.loadModelGroup(model, "Sprite");
        mmanager.loadModelGroup(model, "SpritesGroup");
        mmanager.loadModelGroup(model, "Variable");
        mmanager.loadModelGroup(model, "GroupState");
        mmanager.loadModelGroup(model, "ConditionalGroupState");
        mmanager.loadModelGroup(model, "Condition");
        mmanager.loadModelGroup(model, "Action");
    }
    ;

    transpose();

    /*this.addItem("SpriteFileReference", "sr1", {filereference: "test"});
     this.addItem("SpriteFileReference", "sr2", {filereference: "test2"});
     this.addItem("Sprite", "sp1", {type: "sr1", x: 23, y: 65});
     this.addItem("Sprite", "sp2", {type: "sr2", x: 23, y: 65});
     this.addItem("Action", "act1", {type: "displaysprite", sprite: "sp1"});
     this.addItem("SpritesGroup", "gr1", {sprites: ["sp1", "sp2"]});
     this.addItem("Variable", "vr1", {type: "string", value: "test"});*/

};