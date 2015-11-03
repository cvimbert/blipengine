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

    /*function isFinalType(objectType) {
        return objectType === "String" || objectType === "Number" || objectType === "Boolean";
    }*/


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

            var propDesc = modelDescriptor[prop];
            if (propDesc.indexable) {
                // on vérifie si l'objet est indexé, donc existant
                var val = item[propkey];

                if (!isInIndex(prop, val)) {
                    isValid = false;
                    console.log("Object absent de l'index");
                }
            } else {
                // sinon on vérifie si l'objet est bien conforme à ce qui est attendu
                
            }
        });

        return isValid;
    }

    this.addItem("SpriteFileReference", "sr1", {filereference: "test"});
    this.addItem("Sprite", "sp1", {type: "sr1", x: 23, y: 65});

    return this;
};