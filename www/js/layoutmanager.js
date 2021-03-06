/* global _ */

var LayoutManager = function (layoutData) {

    // templates
    var graphicElemTemplate = _.template($("#graphic-elem-template").html());
    var moduleElemTemplate = _.template($("#module-elem-template").html());

    // génération des sprites
    var sprites = addElements("spritescontainer", "sprite", layoutData.sprites);

    // génération des fonds
    var backgrounds = addElements("backgroundcontainer", "background", layoutData.background);

    // génération du foreground
    var foregrounds = addElements("foregroundcontainer", "foreground", layoutData.foreground);

    // génération des contrôles
    var controls = addElements("controlscontainer", "control", layoutData.controls);

    // affichage des modules
    var modules = addModuleElements("spritescontainer", "module", layoutData.modules);
    

    function addModuleElements(container, type, datas) {
        var elems = [];

        _.each(datas, function (mod) {
            mod.name = type + "-" + mod.id;
            var htm = moduleElemTemplate(mod);
            
            //$(htm).append(window.registeredModules.display());
            
            $("#" + container).append(htm);
        });
    }
    ;

    function addElements(container, type, datas) {

        var elems = [];

        for (var i = 0; i < datas.length; i++) {
            var elemData = datas[i];

            elemData.folder = type;
            elemData.name = type + "-" + elemData.id;

            var elemHtml = graphicElemTemplate(elemData);
            $(elemHtml).attr("id", type + "-" + elemData.id);
            $("#" + container).append(elemHtml);

            elems.push(elemHtml);
        }

        return elems;
    }
    ;
};