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
            
            $scope.renderCb = function (e) {
                /*setTimeout(function() {
                    $(".combobox").combobox();
                }, 300);*/
            };
            
            $scope.attributeSetSelected = function () {
                $scope.item = modelManager.getUnitDescriptor($scope.descid).getObjectBySource($scope.descid, $scope.item);
                $scope.descriptor = modelManager.getUnitDescriptor($scope.descid).flattenByItem($scope.item);
                console.log("yes");
            };
            
            $scope.validate = function () {
                
            };
        });

var ModelMonitor = function (modelManager) {
    //var rowTemplate = _.template($("#monitor-row-container-template").html());

    //var container = $("#monitor-container");

    this.display = function () {
        var descs = modelManager.getDescriptors();
        var displayersCount = 0;
        var currentRow;

        _.each(descs, function (descriptor, descriptorId) {
            var rawDesc = descriptor.getRaw();

            if (rawDesc.referenceable) {

                if (displayersCount % 4 === 0) {
                    currentRow = $(rowTemplate({}));
                    container.append(currentRow);
                }

                var monitor = new UnitModelMonitor(descriptorId, descriptor);
                monitor.displayInContainer(currentRow);

                displayersCount++;
            }
        });
    };
};


var EditionModal = function (model, modelDescriptor, descId) {
    var modal = $("#modal-basic");
    var self = this;
    var title = $(".modal-title", modal);
    var body = $(".modal-body", modal);

    var containerTemplate = _.template('<div class="modal-attribute-container"></div>');
    var inputGroupTemplate = _.template('<div class="input-group monitor-modal-input-group"><span class="input-group-addon monitor-modal-input-group-addon" id="basic-addon-<%= id %>"><%= id %></span></div>');



    this.clear = function () {
        title.html("");
        body.html("");
    };

    this.open = function () {
        self.clear();
        self.populate();

        // ouverture
        $("#modal-basic-test").modal();

    };

    this.populate = function () {
        title.html("Créer " + descId);

        var attributes = modelDescriptor.getAttributes();
        var count = 0;

        _.each(attributes, function (attributeValue, attributeId) {
            var cont = $(containerTemplate({id: attributeId}));
            var inputGroup = $(inputGroupTemplate({id: attributeId}));

            if (count % 2 === 0) {
                cont.addClass("in");
            } else {
                cont.addClass("out");
            }

            if (Widgets[attributeValue.type]) {
                var widget = Widgets[attributeValue.type];

                if (widget.populate) {
                    _.bind(widget.populate, widget);
                }

                widget.$el = inputGroup;

                var widgetTemplate = _.template(widget.template);
                var widgetElem = $(widgetTemplate({value: "", id: attributeId}));

                widgetElem.on("change", function () {

                });

                inputGroup.append(widgetElem);

                if (attributeValue.type === "ConditionalAttributesSet") {
                    var values = {};

                    for (var setName in attributeValue.attributesSets) {
                        values[setName] = setName;
                    }

                    widget.populate(values);
                }
            }

            body.append(cont);
            cont.html(inputGroup);

            count++;
        });
    };

    this.close = function () {

    };

    return this;
};


var UnitModelMonitor = function (id, descriptor) {

    var unitMonitorTemplate = _.template($("#unit-monitor-template").html());

    var templateArgs = {
        id: id.toLowerCase(),
        name: id
    };

    var monitor = $(unitMonitorTemplate(templateArgs));

    $(".btn-add", monitor).click(function () {
        var popup = new EditionModal(null, descriptor, id);
        popup.open();
    });

    this.displayInContainer = function ($container) {
        $container.append(monitor);
    };

    function openCreationModal() {
        $('#modal-basic').modal();
    }
};

var modelManager;
var modelMonitor;

$(document).ready(function () {
    modelManager = new ModelManagerV2();
    modelMonitor = new ModelMonitor(modelManager);

    //modelMonitor.display();
});