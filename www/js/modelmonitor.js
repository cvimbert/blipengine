/* global _, Widgets, angular, modelDescriptorV3 */

angular.module("model-monitor", [])
        .controller("model-monitor-controller", function ($scope) {
            var modelManager = new ModelManagerV2();
    
            $scope.completeDescriptor = modelDescriptorV3;
            $scope.completeModel = modelManager.getModel();

            $scope.addElement = function (descid) {
                $scope.descid = descid;
                $scope.item = modelManager.getUnitDescriptor(descid).getObjectBySource(null);
                $scope.descriptor = modelManager.getUnitDescriptor(descid).flattenByItem($scope.item);
                $("#modal-desc").modal();
            };
            
            $scope.getName = function (item) {
                if (item.name) {
                    return item.name;
                } else {
                    return item.uid;
                }
            };

            $scope.editElement = function (descid, item) {
                $scope.descid = descid;
                $scope.item = item;
                $scope.descriptor = modelManager.getUnitDescriptor(descid).flattenByItem(item);
                $("#modal-desc").modal();
            };

            $scope.attributeSetSelected = function () {
                $scope.item = modelManager.getUnitDescriptor($scope.descid).getObjectBySource($scope.item);
                $scope.descriptor = modelManager.getUnitDescriptor($scope.descid).flattenByItem($scope.item);
            };
            
            $scope.getReferences = function (targetDescid) {
                return modelManager.getModelById(targetDescid);
            };

            $scope.validate = function () {
                modelManager.saveObject($scope.descid, $scope.item);
            };

            $scope.save = function () {
                modelManager.saveToStorage();
            };

            $scope.deleteModel = function () {
                modelManager.clearModel();
                modelManager.deleteLocalStorage();
            };
        });