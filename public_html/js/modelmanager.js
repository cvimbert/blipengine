/* global modelDescriptor, _ */

var ModelManager = function () {

    _.each(modelDescriptor, function () {
        alert ("ok");
    });

    return this;
};