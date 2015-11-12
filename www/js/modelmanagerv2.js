/* global modelDescriptorV3, _ */

var ModelDescriptor = function (modelDescriptor) {

    var unitDescriptors = {};

    for (var descId in modelDescriptor) {
        unitDescriptors[descId] = new ObjectModelDescriptor(modelDescriptor[descId], this);
    }

    this.getFlattenedDescriptor = function () {

    };
};


var ObjectModelDescriptor = function (objectDescriptor, modelDescriptor) {

    var attributes = {};
    var rawAttributes = {};

    this.getAttributes = function () {
        return objectDescriptor.attributes;
    };

    this.getAttribute = function (id) {
        return getAttributes()[id];
    };

    this.getFlattened = function (conditionalAttributesValues) {
        
        var flattenedDescriptor = _.clone(objectDescriptor);
        
        for (var attributeId in attributes) {
            switch (attributes[attributeId].getType()) {
                case "ConditionalAttributesSet":
                    if (conditionalAttributesValues[attributeId]) {
                        // on peut faire le flatten
                        
                    } else {
                        console.warn("ObjectModelDescriptor - ConditionalAttributesSet n'a pas de valeur possible : " + attributeId);
                    }
                    break;

                default:
                    

            }
        }
        
        return flattenedDescriptor;
    };

    rawAttributes = this.getAttributes();

    for (var attrKey in rawAttributes) {
        attributes[attrKey] = new ObjectModelDescriptorAttribute(rawAttributes[attrKey]);
    }
};

var ObjectModelDescriptorAttribute = function (objectDescriptorAttribute) {

    this.getType = function () {
        var type = objectDescriptorAttribute.type;

        if (type === "ConditionalAttributesSet" || type === "Enumeration" || type === "Collection") {
            return type;
        }

        if (type === "string" || type === "number" || type === "boolean") {
            return "basic";
        }

        console.error("ObjectModelDescriptorAttribute - Le type de l'attribut n'est pas valide : " + type);
        return null;
    };
};

var ModelManagerV2 = function () {

    var modelDescriptor = new ModelDescriptor(modelDescriptorV3);




    return this;
};