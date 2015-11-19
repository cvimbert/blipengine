/* global _, Widgets, angular, modelDescriptorV3 */

angular.module("model-monitor", [])
        .controller("model-monitor-controller", function ($scope) {
            $scope.completeDescriptor = modelDescriptorV3;

            $scope.addElement = function (descid) {
                $scope.descid = descid;
                $scope.item = modelManager.getUnitDescriptor(descid).getObjectBySource(descid, null);
                $scope.descriptor = modelManager.getUnitDescriptor(descid).flattenByItem($scope.item);
                $("#modal-desc").modal();
            };

            $scope.editElement = function () {

            };

            $scope.attributeSetSelected = function () {
                $scope.item = modelManager.getUnitDescriptor($scope.descid).getObjectBySource($scope.descid, $scope.item);
                $scope.descriptor = modelManager.getUnitDescriptor($scope.descid).flattenByItem($scope.item);
            };

            $scope.validate = function () {
                modelManager.saveObject($scope.descid, $scope.item);
            };
            
            $scope.save = function () {
                
            };
            
            $scope.deleteModel = function () {
                
            };
        });


var modelManager;

$(document).ready(function () {
    modelManager = new ModelManagerV2();
});