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
    
    function clone(object) {
        var ser = JSON.stringify(object);
        return JSON.parse(ser);
    }

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


    this.getObjectBySource = function (descriptorId, sourceObject) {
        var destObject = {};
        self.getObject(modDescriptor.getUnitDescriptor(descriptorId).getRaw().attributes, sourceObject, destObject);
        return destObject;
    };


    this.getObject = function (descriptorAttributes, sourceObject, destObject) {

        _.each(descriptorAttributes, function (attribute, attributeId) {
            if (!sourceObject || !sourceObject[attributeId]) {
                switch (attribute.type) {
                    case "string":
                        destObject[attributeId] = "test";
                        break;

                    case "number":
                        destObject[attributeId] = 4;
                        break;

                    case "boolean":
                        destObject[attributeId] = false;
                        break;

                    case "ConditionalAttributesSet":
                        destObject[attributeId] = "";
                        break;

                    default:
                        destObject[attributeId] = "";
                }
            } else {
                if (attribute.type === "ConditionalAttributesSet") {
                    destObject[attributeId] = sourceObject[attributeId];
                    self.getObject(attribute.attributesSets[sourceObject[attributeId]], sourceObject, destObject);
                } else {
                    destObject[attributeId] = sourceObject[attributeId];
                }
            }
        });
    };
    
    
    this.flattenByItem = function(item) {
        var destDesc = {};
        flattenByItemAction(item, objectDescriptor.attributes, destDesc);
        return destDesc;
    };
    
    
    function flattenByItemAction(item, attributes, destDesc) {
        
        _.each(attributes, function(attribute, attributeId) {
            
            destDesc[attributeId] = attribute;
            
            if (attribute.type === "ConditionalAttributesSet") {
                var selectedBranch = attribute.attributesSets[item[attributeId]];
                flattenByItemAction(item, selectedBranch, destDesc);
            }
        });
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

    this.getDescriptors = function () {
        return modelDescriptor.getDescriptors();
    };

    this.getUnitDescriptor = function (id) {
        return modelDescriptor.getDescriptors()[id];
    };

    return this;
};