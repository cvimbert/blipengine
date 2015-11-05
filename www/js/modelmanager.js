/* global modelDescriptor, _ */

var ModelManager = function () {

    var objectsIndex = [];

    _.each(modelDescriptor, function (objectDesc, key) {
        if (objectDesc.indexable === true) {
            if (!objectsIndex[key]) {
                objectsIndex[key] = {};
            }
        }
    });


    function getDescriptor(type) {
        return _.clone(modelDescriptor[type]);
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

    function isFinalType(objectType) {
        return objectType === "String" || objectType === "Number" || objectType === "Boolean";
    }

    function isCollection(prop) {
        return prop.lastIndexOf("Collection:") !== -1;
    }

    function getCollectionType(prop) {
        return prop.split("Collection:")[1];
    }

    function isVariableProperty(prop) {
        return false;
    }


    function validateObject(itemType, id, item) {
        var itemDescriptor = getDescriptor(itemType);
        var isItemValid = true;

        // on teste chacune des propriétés du descriptor
        _.each(itemDescriptor, function (descriptorPropertyType, descriptorPropertyKey) {
            if (descriptorPropertyKey !== "indexable" && descriptorPropertyKey !== "id") {

                // on commence déjà par verifier si une propriété avec le même nom existe dans l'item
                if (!item[descriptorPropertyKey]) {
                    isItemValid = false;
                    console.log("propriété introuvable dans l'objet " + id + " : " + descriptorPropertyKey);
                }


                // reste un cas à traiter, celui des propriétés variables
                // si on tombe sur une propriété variable, que fait-on ?
                // et comment savoir que cette propriété est variable ?

                var collection = [];

                console.log(_.isObject(collection));

                if (isCollection(descriptorPropertyType)) {
                    descriptorPropertyType = getCollectionType(descriptorPropertyType);

                    if (!_.isArray(item)) {
                        isItemValid = false;
                        console.log("la collection doit être un array");
                    } else {
                        collection = item;
                    }
                } else if (isVariableProperty(descriptorPropertyType)) {
                    
                } else {
                    collection.push(item);
                }

                var propertyDescriptor = getDescriptor(descriptorPropertyType);

                _.each(collection, function (collectionItem) {

                    if (propertyDescriptor.indexable) {
                        // on teste si l'object cible existe dans l'index
                        if (!isItemInIndex(descriptorPropertyType, collectionItem[descriptorPropertyKey])) {
                            isItemValid = false;
                            console.log("objet " + id + " : objet cible introuvable " + descriptorPropertyKey + " de type " + descriptorPropertyType);
                        }

                    } else {
                        // on teste la conformité de la propriété

                        if (isFinalType(descriptorPropertyType)) {
                            // cas des Number, String et Boolean

                            var tp = typeof collectionItem[descriptorPropertyKey];

                            if (!(tp === descriptorPropertyType.toLowerCase())) {
                                isItemValid = false;
                                console.log("non conformité de type");
                            }
                        } else if (_.isArray(descriptorPropertyType)) {
                            // cas des énumerations
                            if (descriptorPropertyType.lastIndexOf(collectionItem) === -1) {
                                isItemValid = false;
                                console.log("Enumération: l'objet cible ne fait pas partie des valeurs énumérées");
                            }

                        } else {
                            // cas par defaut

                            if (!validateObject(descriptorPropertyType, id, collectionItem[descriptorPropertyKey])) {
                                isItemValid = false;
                                console.log("erreur sur la récursion");
                            }
                        }
                    }
                });


            }
        });

        return isItemValid;
    }

    this.addItem("SpriteFileReference", "sr1", {filereference: "test"});
    this.addItem("SpriteFileReference", "sr2", {filereference: "test2"});
    this.addItem("Sprite", "sp1", {type: "sr1", x: 23, y: 65});
    this.addItem("Sprite", "sp2", {type: "sr2", x: 23, y: 65});
    //this.addItem("SpritesGroup", "gr1", {sprites: ["sp1", "sp2"]});

    return this;
};