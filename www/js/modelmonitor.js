/* global _, Widgets, angular, modelDescriptorV3 */

angular.module("model-monitor", [])
        .controller("modelmonitorcontroller", function ($scope) {
            var modelManager = new ModelManagerV2();
    
            $scope.backItemsStack = [];
    
            $scope.completeDescriptor = modelDescriptorV3;
            $scope.completeModel = modelManager.getModel();

            $scope.addItem = function (descid, addto, addin) {
                $scope.descid = descid;
                $scope.item = modelManager.getUnitDescriptor(descid).getObjectBySource(null);
                
                if (addto && addin && $scope.item.uid) {
                    addto[addin] = $scope.item.uid;
                }
                
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
            
            $scope.editItemByItem = function (item, isback) {
                // attention, ici pas de clone, donc pas de données temporaires d'item
                $scope.descid = item.type;
                $scope.item = item;
                $scope.descriptor = modelManager.getUnitDescriptor(item.type).flattenByItem(item);
                
                if (!isback) {
                    $scope.backItemsStack.push($scope.item);
                }
                
                $("#modal-desc").modal("show");
            };

            $scope.attributeSetSelected = function () {
                $scope.item = modelManager.getUnitDescriptor($scope.descid).getObjectBySource($scope.item);
                
                // on remplace l'objet courant dans la stack
                $scope.backItemsStack[$scope.backItemsStack.length - 1] = $scope.item;
                
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
                    $scope.editItemByItem(it, true);
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
                $event.stopPropagation();
                modelManager.deleteItem(descid, item);
            };
        });