/* global modelDescriptor, _ */

var ModelManager = function () {

    var objectsIndex = [];

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
            console.log("Indexation de l'objet : " + id);
            return true;
        }
    }


    this.addItem = function (itemType, id, item) {

        var itemDescriptor = getDescriptor(itemType);

        if (itemDescriptor === undefined) {
            console.log("Type d'objet inconnu : " + itemType);
            return null;
        }

        var isValid = validateObject(itemType, id, item);

        if (isValid) {
            if (itemDescriptor.indexable) {
                setItem(itemType, id, item);
            }
        } else {
            console.log("Modèle de l'objet non conforme : " + id);
        }
    };

    function isItemInIndex(objectType, id) {
        return (objectsIndex[objectType][id] !== undefined);
    }

    function getCollectionType(prop) {
        return prop.split("Collection:")[1];
    }

    function getPropertyType(prop) {
        //attention, ici l'ordre des tests est important, car une collection est aussi une string dans le descripteur

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


    function getVariableDescriptorKeys(descriptor) {

        var keys = [];

        for (var key in descriptor) {
            if (key !== "indexable" && key !== "id" && getPropertyType(descriptor[key]) === VARIABLE) {
                keys.push(key);
            }
        }

        return keys;
    }


    function getCollectionDescriptorKeys(descriptor) {
        var keys = [];

        for (var key in descriptor) {
            if (key !== "indexable" && key !== "id" && getPropertyType(descriptor[key]) === COLLECTION) {
                keys.push(key);
            }
        }

        return keys;
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


    function flattenDescriptor(descriptor, item) {
        var desc = _.clone(descriptor);
        var variableKeys = getVariableDescriptorKeys(desc);

        _.each(variableKeys, function (key) {
            var itemValue = item[key];

            if (itemValue) {
                var usedDescBranch = desc[key][itemValue];

                // on ajoute toutes les valeurs de cette branche au descripteur
                for (var branchKey in usedDescBranch) {
                    desc[branchKey] = usedDescBranch[branchKey];
                }

                delete desc[key];
            } else {
                console.log("impossible de faire un flatten de variable sur le descripteur");
            }

        });

        return desc;
    }


    function validateObject(itemType, id, item) {
        var itemDescriptor = getDescriptor(itemType);
        itemDescriptor = flattenDescriptor(itemDescriptor, item);

        // on teste chacune des propriétés du descriptor
        for (var descriptorPropertyKey in itemDescriptor) {

            var descriptorPropertyType = itemDescriptor[descriptorPropertyKey];

            if (descriptorPropertyKey !== "indexable" && descriptorPropertyKey !== "id") {

                // on commence déjà par verifier si une propriété avec le même nom existe dans l'item
                if (!item[descriptorPropertyKey]) {
                    //isItemValid = false;
                    console.log("propriété introuvable dans l'objet " + id + " : " + descriptorPropertyKey);
                    return false;
                }

                var collection = [];
                var pType = getPropertyType(descriptorPropertyType);

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

                    if (propertyDescriptor.indexable) {
                        // on teste si l'object cible existe dans l'index
                        if (!isItemInIndex(descriptorPropertyType, collectionItem[descriptorPropertyKey])) {
                            console.log("objet " + id + " : objet cible introuvable " + descriptorPropertyKey + " de type " + descriptorPropertyType);
                            return false;
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
                                if (!validateObject(descriptorPropertyType, id, collectionItem[descriptorPropertyKey])) {
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

    this.addItem("SpriteFileReference", "sr1", {filereference: "test"});
    this.addItem("SpriteFileReference", "sr2", {filereference: "test2"});
    this.addItem("Sprite", "sp1", {type: "sr1", x: 23, y: 65});
    this.addItem("Sprite", "sp2", {type: "sr2", x: 23, y: 65});
    this.addItem("Action", "act1", {type: "displaysprite", sprite: "sp1"});
    this.addItem("SpritesGroup", "gr1", {sprites: ["sp1", "sp2"]});

    return this;
};