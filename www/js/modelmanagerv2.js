/* global modelDescriptorV3, _ */

var ModelDescriptor = function (modelDescriptor) {

    var unitDescriptors = {};

    for (var descId in modelDescriptor) {
        unitDescriptors[descId] = new ObjectModelDescriptor(modelDescriptor[descId], this);
    }

    var cloneDesc = _.clone(unitDescriptors["Condition"].getRaw());
    unitDescriptors["Condition"].getFlattened({type: "checkvariable"}, cloneDesc);


    this.getUnitDescriptor = function (id) {
        return unitDescriptors[id];
    };

    this.getClone = function () {
        // méthode bourrin, mais rapide et qui marche très bien
        var serializedModel = JSON.stringify(modelDescriptor);
        return JSON.parse(serializedModel);
    };
};


var ObjectModelDescriptor = function (objectDescriptor, modDescriptor) {

    var attributes = {};
    var rawAttributes = {};

    this.getRaw = function () {
        return objectDescriptor;
    };

    this.getAttributes = function () {
        return objectDescriptor.attributes;
    };

    this.getAttribute = function (id) {
        return getAttributes()[id];
    };

    this.getClone = function () {
        var serializedDescriptor = JSON.stringify(objectDescriptor);
        return JSON.parse(serializedDescriptor);
    };

    function getAttributeType(attribute) {
        var attrType = attribute.type;

        if (attrType === "string" || attrType === "number" || attrType === "boolean") {
            return "basic";
        }

        if (attribute.usereference === true) {
            return "reference";
        }

        return attrType;
    }

    this.getFlattened = function (conditionalAttributesValues, descriptorToFlatten) {
        // flattened, doit être cloné avant l'appel de la fonction, sinon on
        // remplace les attributs du descripteur !!!!

        //var flattenedDescriptor = _.clone(objectDescriptor);
        descriptorToFlatten.attributes = _.clone(descriptorToFlatten.attributes);


        for (var attributeId in rawAttributes) {
            var currentAttribute = rawAttributes[attributeId];

            var attrType = getAttributeType(currentAttribute);

            if (attrType === "ConditionalAttributesSet") {
                // dans ce cas on remplace l'attribut par le choix conditionnel

                if (conditionalAttributesValues[attributeId]) {
                    // on peut choisir
                    var choiceValue = conditionalAttributesValues[attributeId];

                    if (currentAttribute.attributesSets[choiceValue]) {

                        var choosenBranch = _.clone(currentAttribute.attributesSets[choiceValue]);
                        descriptorToFlatten.attributes[attributeId] = choosenBranch;

                        // et ensuite un appel récursif pour traiter les ConditionalAttributSets imbriqués

                    } else {
                        console.warn("ObjectModelDescriptor - Pas de branche possible dans le descripteur : " + attributeId);
                    }

                } else {
                    console.warn("ObjectModelDescriptor - ConditionalAttributesSet n'a pas de valeur possible : " + attributeId);
                }
            } else if (attrType === "Collection") {
                // cas non traité pour le moment, on considère qu'une collection utilise toujours des références

            } else if (attrType !== "basic") {
                // remplacement brut des données dans le descripteur
                var targetDesc = modDescriptor.getUnitDescriptor(attrType).getRaw();

                alert("ok");
            }
        }

        //return flattended;
    };

    rawAttributes = this.getAttributes();

    for (var attrKey in rawAttributes) {
        attributes[attrKey] = new ObjectModelDescriptorAttribute(rawAttributes[attrKey]);
    }
};

var ObjectModelDescriptorAttribute = function (objectDescriptorAttribute) {

    this.getType = function () {
        var type = objectDescriptorAttribute.type;

        /*if (type === "ConditionalAttributesSet" || type === "Enumeration" || type === "Collection") {
         return type;
         }*/

        if (type === "string" || type === "number" || type === "boolean") {
            return "basic";
        }

        //console.error("ObjectModelDescriptorAttribute - Le type de l'attribut n'est pas valide : " + type);
        return type;
    };
};

var ModelManagerV2 = function () {

    var modelDescriptor = new ModelDescriptor(modelDescriptorV3);




    return this;
};