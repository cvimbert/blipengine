
/* global _ */

// enregistrement automatique de ce module

window.registeredModules["seg7"] = function (manager) {

    var displayHtml = $('<div class="module-seg7-displayer"><span id="seg7-disp3" class="seg7-num">0</span><span id="seg7-disp2" class="seg7-num">0</span><span id="seg7-sep">:</span><span id="seg7-disp1" class="seg7-num">0</span><span id="seg7-disp0" class="seg7-num">0</span></div>');

    var listenedVariable;

    this.initialize = function (moduleDefinition) {
        listenedVariable = manager.variables[moduleDefinition.variable];

        manager.nmanager.listen("variablechange", moduleDefinition.variable, "", function (data) {
            setValue(data);
        });

        clear();
    };

    this.display = function () {
        return displayHtml;
    };

    function clear () {
        $(".seg7-num", displayHtml).html("");
        $("#seg7-sep", displayHtml).html("");
    };

    function setValue(value) {
        var valStr = String(value);

        clear();

        var dispIndex = 0;

        for (var i = valStr.length - 1; i >= 0; i--) {
            $("#seg7-disp" + dispIndex, displayHtml).html(valStr[i]);
            dispIndex++;
        }
    }
};