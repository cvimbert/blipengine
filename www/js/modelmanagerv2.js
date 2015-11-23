/* global modelDescriptorV3, _, uuid */

var ModelDescriptor = function (modelDescriptor) {

    var unitDescriptors = {};

    for (var descId in modelDescriptor) {
        unitDescriptors[descId] = new ObjectModelDescriptor(modelDescriptor[descId], this, descId);
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


var ObjectModelDescriptor = function (objectDescriptor, modDescriptor, descid) {

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

        if (attrType === "collection") {
            return "collection";
        }

        return "injection";
    }


    this.getObjectBySource = function (sourceObject) {
        var destObject = {};
        
        if (sourceObject && sourceObject.uid) {
            destObject.uid = sourceObject.uid;
        }
        
        if (sourceObject && sourceObject.type) {
            destObject.type = sourceObject.type;
        }

        var fdesc = self.flattenByItem(sourceObject);
        self.getObject(fdesc, sourceObject, destObject);
        
        if (!destObject.uid) {
            destObject.uid = uuid.v4();
        }
        
        if (!destObject.type) {
            destObject.type = descid;
        }
        
        return destObject;
    };


    this.getObject = function (descriptorAttributes, sourceObject, destObject) {
        _.each(descriptorAttributes, function (attribute, attributeId) {
            if (!sourceObject || !sourceObject[attributeId]) {
                switch (attribute.type) {
                    case "string":
                        destObject[attributeId] = "";
                        break;

                    case "number":
                        if (attribute.defaultvalue) {
                            destObject[attributeId] = attribute.defaultvalue;
                        } else {
                            destObject[attributeId] = 0;
                        }
                        break;

                    case "boolean":
                        if (attribute.defaultvalue) {
                            destObject[attributeId] = attribute.defaultvalue;
                        } else {
                            destObject[attributeId] = "false";
                        }
                        break;

                    case "ConditionalAttributesSet":
                        destObject[attributeId] = "";
                        break;
                        
                    case "collection":
                        destObject[attributeId] = [];
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


    this.flattenByItem = function (item) {
        var destDesc = {};
        self.flattenByDescItem(item, objectDescriptor, destDesc, 0);
        return destDesc;
    };


    this.flattenByDescItem = function (item, desc, destDesc, indentation) {
        flattenByItemAction(item, desc.attributes, destDesc, indentation);
    };


    this.flattenAttribute = function (item, attribute, attributeId, destDesc, indentation) {

        destDesc[attributeId] = attribute;
        destDesc[attributeId].indentation = indentation;

        if (attribute.type === "ConditionalAttributesSet") {

            if (item && item[attributeId]) {
                var selectedBranch = attribute.attributesSets[item[attributeId]];
                flattenByItemAction(item, selectedBranch, destDesc, indentation + 1);
            }


        } else if (attribute.type === "include") {

            var targetDescriptor = modDescriptor.getUnitDescriptor(attribute.includetype).getRaw();
            self.flattenAttribute(item, targetDescriptor, attributeId, destDesc, indentation);
        }
    };


    function flattenByItemAction(item, attributes, destDesc, indentation) {

        _.each(attributes, function (attribute, attributeId) {
            self.flattenAttribute(item, attribute, attributeId, destDesc, indentation);
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

    var itemsByDescid = {};
    var items = {};

    //delete localStorage["model"];

    if (localStorage["model"]) {
        items = JSON.parse(localStorage["model"]);
        
        _.each(items, function(item) {
            if (!itemsByDescid[item.type]) {
                itemsByDescid[item.type] = {};
            }
            
            itemsByDescid[item.type][item.uid] = item;
        });
    }


    var modelDescriptor = new ModelDescriptor(modelDescriptorV3);

    this.getDescriptors = function () {
        return modelDescriptor.getDescriptors();
    };

    this.getUnitDescriptor = function (id) {
        return modelDescriptor.getDescriptors()[id];
    };

    this.saveObject = function (objectType, object) {
        if (!itemsByDescid[objectType]) {
            itemsByDescid[objectType] = {};
        }

        itemsByDescid[objectType][object.uid] = object;
        items[object.uid] = object;
    };

    this.saveToStorage = function () {
        localStorage["model"] = JSON.stringify(items);
    };

    this.deleteLocalStorage = function () {
        delete localStorage["model"];
    };

    this.getModel = function () {
        return itemsByDescid;
    };
    
    this.getModelById = function (descid) {
        return itemsByDescid[descid];
    };
    
    this.deleteItem = function (descid, item) {
        delete itemsByDescid[descid][item.uid];
        delete items[item.uid];
    };
    
    this.clearModel = function () {
        _.each(itemsByDescid, function(modelContent, modelType) {
            delete itemsByDescid[modelType];
        });
        
        items = {};
    };
    
    this.getItem = function (uid) {
        return items[uid];
    };

    return this;
};