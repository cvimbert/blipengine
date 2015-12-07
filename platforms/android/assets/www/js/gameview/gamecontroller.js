/* global angular */

angular.module("game", [])
        .controller("gamecontroller", function ($scope) {
            
            // en cas de vraie vue angular, ces lignes doivent disparaître
            var modelManager = new ModelManagerV2();
            modelManager.init();
            modelManager.loadModel("yop");
            
            $scope.model = modelManager.getModel();
            
            $scope.getSpriteFileRef = function (spriteDef) {
                var spriteFileRef = $scope.model["SpriteFileReference"][spriteDef.reference];
                return spriteFileRef;
            };
            
            $scope.getSpriteFilePackage = function (spriteDef) {
                var spriteFileRef = $scope.getSpriteFileRef(spriteDef);
                var package = $scope.model["Package"][spriteFileRef.package];
                return package;
            };
        });
        
        
        