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


    this.addItem = function (objectType, id, item) {

        if (modelDescriptor[objectType] === undefined) {
            console.log("Type d'objet inconnu : " + objectType);
            return;
        }

        var descriptor = modelDescriptor[objectType];

        var isValid = validateObject(objectType, id, item);

        if (isValid) {
            if (descriptor.indexable) {
                if (objectsIndex[objectType][id] !== undefined) {
                    console.log("Impossible d'indexer un objet qui est déjà référencé : " + id);
                } else {
                    objectsIndex[objectType][id] = item;
                    console.log("Indexation de l'objet : " + id);
                }
            }
        } else {
            console.log("Modèle de l'objet non conforme : " + id);
        }
    };

    function isInIndex(objectType, id) {
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


    function validateObject(objectType, id, item) {
        var descriptor = modelDescriptor[objectType];
        var isValid = true;

        // on vérifie si toutes les propriétés du descripteur son présentes
        _.each(descriptor, function (prop, propkey) {

            if (propkey === "id" || propkey === "indexable") {
                return;
            }

            if (item[propkey] === undefined) {
                isValid = false;
            }
            
            
            var propDesc = "";

            if (isCollection(prop)) {
                propDesc = modelDescriptor[getCollectionType(prop)];
            } else {
                propDesc = modelDescriptor[prop];
            }
            
            //var propDesc = modelDescriptor[prop];



            if (propDesc.indexable) {
                // on vérifie si l'objet est indexé, donc existant
                var val = item[propkey];

                if (!isInIndex(prop, val)) {
                    isValid = false;
                    console.log("Object absent de l'index : " + val);
                }
            } else {
                // verification du type de l'object dans le cas où l'object
                var val = item[propkey];
                // cas des types finaux: string, boolean et number
                if (isFinalType(prop)) {
                    var tp = typeof val;

                    if (!(tp === prop.toLowerCase())) {
                        isValid = false;
                        console.log("Impossible de valider l'objet, non concordance de type final");
                    }

                }
            }
        });

        return isValid;
    }

    this.addItem("SpriteFileReference", "sr1", {filereference: "test"});
    this.addItem("SpriteFileReference", "sr2", {filereference: "test2"});
    this.addItem("Sprite", "sp1", {type: "sr1", x: 23, y: 65});
    this.addItem("Sprite", "sp2", {type: "sr2", x: 23, y: 65});
    this.addItem("SpritesGroup", "gr1", {sprites: ["sp1", "sp2"]});

    return this;
};