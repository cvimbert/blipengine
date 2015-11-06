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

        var isValid = validateObject(itemType, id, item, item);

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
        for(var descKey in descriptorToFlatten) {
            var descProp = descriptorToFlatten[descKey];

            if (getPropertyType(descProp) === VARIABLE) {
                var itemValue = item[descKey];

                if (itemValue && descriptorToFlatten[descKey][itemValue]) {
                    if (!flatten(descriptorToFlatten[descKey][itemValue], item, destObject)) {
                        return false;
                    }
                } else {
                    console.log("impossible de faire un flatten de propriété variable sur le descripteur");
                    return false;
                }
            } else {
                destObject[descKey] = descProp;
            }
        }

        return true;
    }


    function validateObject(itemType, id, item, baseitem) {
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

            if (descriptorPropertyKey !== "indexable" && descriptorPropertyKey !== "id") {

                // on commence déjà par verifier si une propriété avec le même nom existe dans l'item
                // sauf dans le cas des énumérations
                if (pType !== ENUMERATION && !item[descriptorPropertyKey]) {
                    //isItemValid = false;
                    console.log("propriété introuvable dans l'objet " + id + " : " + descriptorPropertyKey);
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
                                if (!validateObject(descriptorPropertyType, id, collectionItem[descriptorPropertyKey], baseitem)) {
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
    this.addItem("Variable", "vr1", {type: "string", value: "test"});
    this.addItem("Condition", "cd1", {type: "variablecheck", variable: "vr1", variabletype: "string", operator: "===", value: "ok"});

    return this;
};