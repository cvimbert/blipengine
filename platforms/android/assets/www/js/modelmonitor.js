/* global _, Widgets, angular, modelDescriptorV3, Localization */

angular.module("model-monitor", [])
        .controller("modelmonitorcontroller", function ($scope) {
            var modelManager = new ModelManagerV2();

            var defaultLanguage = "fr";

            var pendingItems = {};

            // temp
            $scope.collectionid = "";

            $scope.backItemsStack = [];

            $scope.completeDescriptor = modelDescriptorV3;
            $scope.completeModel = modelManager.getModel();

            $scope.getLocString = function (id) {
                if (!id) {
                    return "";
                }

                if (Localization[defaultLanguage][id.toLowerCase()]) {
                    return Localization[defaultLanguage][id.toLowerCase()];
                } else {
                    return id;
                }
            };

            $scope.addItem = function (descid, addto, addin) {
                $scope.descid = descid;
                var itemDesc = modelManager.getUnitDescriptor(descid);
                //var rawItemDesc = itemDesc.getRaw();

                $scope.item = itemDesc.getObjectBySource(null);


                if (addto && addin && $scope.item.uid) {
                    //alert (rawItemDesc.attributes[addin].type);
                    var pitem = {addto: addto, addin: addin, added: $scope.item.uid};
                    pendingItems[$scope.item.uid] = pitem;

                    // temporaire
                    //addPendingItems();
                }

                $scope.descriptor = itemDesc.flattenByItem($scope.item);

                $scope.backItemsStack.push($scope.item);

                $("#modal-desc").modal("show");
            };


            /*function addPendingItems() {

                _.each(pendingItems, function (pitem) {

                    if (pitem) {
                        var toDesc = modelManager.getUnitDescriptor(pitem.addto.type).getRaw();
                        var toType = toDesc.attributes[pitem.addin].type;

                        if (toType === "collection") {
                            pitem.addto[pitem.addin].push($scope.item.uid);
                        } else if (toType === "reference") {
                            pitem.addto[pitem.addin] = $scope.item.uid;
                        }
                    }
                });

                pendingItems = {};
            }*/

            function validatePendingItem(uid) {

                if (pendingItems[uid]) {
                    var pitem = pendingItems[uid];

                    var toDesc = modelManager.getUnitDescriptor(pitem.addto.type).getRaw();
                    var toType = toDesc.attributes[pitem.addin].type;

                    if (toType === "collection") {
                        pitem.addto[pitem.addin].push($scope.item.uid);
                    } else if (toType === "reference") {
                        pitem.addto[pitem.addin] = $scope.item.uid;
                    }
                }
            }
            
            function deletePendingItem(uid) {
                delete pendingItems[uid];
            }
            
            function clearPendingItems() {
                pendingItems = {};
            }

            $scope.getName = function (item, defaultvalue) {
                if (item.name) {
                    return item.name;
                } else {
                    if (defaultvalue !== undefined) {
                        return defaultvalue;
                    } else {
                        return item.uid;
                    }
                }
            };

            $scope.getNameByUid = function (uid) {
                var item = modelManager.getItem(uid);
                return $scope.getName(item);
            };

            $scope.closeEditionModal = function () {
                $scope.backItemsStack = [];
                clearPendingItems();
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
                validatePendingItem($scope.item.uid);

                modelManager.saveObject($scope.descid, $scope.item);
            };

            $scope.goBack = function () {
                
                deletePendingItem($scope.item.uid);
                
                // attention, erreur là dedans
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

            $scope.addItemToCollection = function (uid, targetItemAttribute) {
                if (uid && targetItemAttribute) {
                    targetItemAttribute.push(uid);
                }
            };

            $scope.deleteItemFromCollection = function (index, targetItemAttribute) {
                targetItemAttribute.splice(index, 1);
            };
        });