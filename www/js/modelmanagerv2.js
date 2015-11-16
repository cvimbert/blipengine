/* global modelDescriptorV3, _ */

var ModelDescriptor = function (modelDescriptor) {

    var unitDescriptors = {};

    for (var descId in modelDescriptor) {
        unitDescriptors[descId] = new ObjectModelDescriptor(modelDescriptor[descId], this);
    }


    this.getDescriptors = function () {
        return unitDescriptors;
    };


    this.getUnitDescriptor = function (id) {
        return unitDescriptors[id];
    };

    this.getClone = function () {
        // méthode bourrin, mais rapide et qui marche très bien
        var serializedModel = JSON.stringify(modelDescriptor);
        return JSON.parse(serializedModel);
    };

    this.getFlattened = function (descriptorId) {
        //return 
    };

    var flattenedCondition = this.getUnitDescriptor("Condition").flatten({type: "checkvariable", variabletype: "boolean"});
    var flattenedVariable = this.getUnitDescriptor("Variable").flatten({type: "number"});

    console.log("ok");
};


var ObjectModelDescriptor = function (objectDescriptor, modDescriptor) {

    var self = this;

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

    this.flatten = function (conditionalAttributesValues) {
        var descriptorToFlatten = self.getClone();
        flattenAction(conditionalAttributesValues, descriptorToFlatten);
        return descriptorToFlatten;
    };

    function flattenAction(conditionalAttributesValues, descriptorToFlatten) {

        for (var attributeId in descriptorToFlatten.attributes) {
            var currentAttribute = descriptorToFlatten.attributes[attributeId];

            var attrType = getAttributeType(currentAttribute);

            if (attrType === "ConditionalAttributesSet") {

                // dans ce cas on remplace l'attribut par le choix conditionnel
                if (conditionalAttributesValues[attributeId]) {
                    // on peut choisir
                    var choiceValue = conditionalAttributesValues[attributeId];

                    if (currentAttribute.attributesSets[choiceValue]) {

                        var choosenBranch = currentAttribute.attributesSets[choiceValue];

                        // fusion de la branche choisie dans les attributs
                        _.each(choosenBranch, function (targetAttribute, targetAttributeId) {
                            descriptorToFlatten.attributes[targetAttributeId] = targetAttribute;
                        });

                        // et suppression du set
                        delete descriptorToFlatten.attributes[attributeId];

                        // et ensuite un appel récursif pour traiter les ConditionalAttributSets imbriqués
                        flattenAction(conditionalAttributesValues, descriptorToFlatten);

                    } else {
                        console.warn("ObjectModelDescriptor - Pas de branche possible dans le descripteur : " + attributeId);
                    }

                } else {
                    console.warn("ObjectModelDescriptor - ConditionalAttributesSet n'a pas de valeur possible : " + attributeId);
                }
            } else if (attrType === "Collection") {
                // cas non traité pour le moment, on considère qu'une collection utilise toujours des références

            } else if (attrType !== "basic" && attrType !== "reference" && attrType !== "Enumeration") {
                // remplacement brut des données dans le descripteur
                var targetDesc = modDescriptor.getUnitDescriptor(attrType).getClone();

                _.each(targetDesc, function (targetDescChild, targetDescChildId) {
                    currentAttribute[targetDescChildId] = targetDescChild;
                });

                // appel recursif
                flattenAction(conditionalAttributesValues, descriptorToFlatten);
            }
        }
    }
    ;

};

var ModelManagerV2 = function () {

    var modelDescriptor = new ModelDescriptor(modelDescriptorV3);

    this.getDescriptors = function() {
        return modelDescriptor.getDescriptors();
    };


    return this;
};