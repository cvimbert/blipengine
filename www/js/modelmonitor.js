/* global _, Widgets, angular, modelDescriptorV3 */

angular.module("model-monitor", [])
        .controller("modelmonitorcontroller", function ($scope) {
            var modelManager = new ModelManagerV2();
    
            $scope.backItemsStack = [];
    
            $scope.completeDescriptor = modelDescriptorV3;
            $scope.completeModel = modelManager.getModel();

            $scope.addItem = function (descid, backitemid) {
                $scope.descid = descid;
                $scope.item = modelManager.getUnitDescriptor(descid).getObjectBySource(null);
                $scope.descriptor = modelManager.getUnitDescriptor(descid).flattenByItem($scope.item);
                
                $scope.backItemsStack.push($scope.item);
                
                $("#modal-desc").modal("show");
            };
            
            $scope.getName = function (item) {
                if (item.name) {
                    return item.name;
                } else {
                    return item.uid;
                }
            };
            
            $scope.closeEditionModal = function () {
                $scope.backItemsStack = [];
                $("#modal-desc").modal("hide");
            };

            $scope.editItem = function (uid) {
                var item = modelManager.getItem(uid);
                $scope.editItemByItem(_.clone(item));
            };
            
            $scope.editItemByItem = function (item) {
                // attention, ici pas de clone, donc pas de données temporaires d'item
                $scope.descid = item.type;
                $scope.item = item;
                $scope.descriptor = modelManager.getUnitDescriptor(item.type).flattenByItem(item);
                
                //$scope.backItemsStack.push(backitemid);
                $scope.backItemsStack.push($scope.item);
                
                $("#modal-desc").modal("show");
            };

            $scope.attributeSetSelected = function () {
                $scope.item = modelManager.getUnitDescriptor($scope.descid).getObjectBySource($scope.item);
                $scope.descriptor = modelManager.getUnitDescriptor($scope.descid).flattenByItem($scope.item);
            };
            
            $scope.getReferences = function (targetDescid) {
                var mod = modelManager.getModelById(targetDescid);
                return mod;
            };

            $scope.validate = function () {
                modelManager.saveObject($scope.descid, $scope.item);
            };
            
            $scope.goBack = function () {
                if ($scope.backItemsStack.length > 1) {
                    var it = $scope.backItemsStack.shift();
                    $scope.editItemByItem(it);
                } else {
                    $scope.closeEditionModal();
                }
            };
            
            $scope.validateAndGoBack = function () {
                $scope.validate();
                $scope.goBack();
            };

            $scope.save = function () {
                modelManager.saveToStorage();
            };

            $scope.deleteModel = function () {
                modelManager.clearModel();
                modelManager.deleteLocalStorage();
            };
            
            $scope.deleteItem = function (descid, item, $event) {
                console.log ("delitem");
                $event.stopPropagation();
                modelManager.deleteItem(descid, item);
            };
        });