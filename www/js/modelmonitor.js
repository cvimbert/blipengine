/*$(document).ready(function () {
 $(".btn-add").click(function () {
 $('#modal-basic').modal();
 });
 });*/

var ModelMonitor = function () {
    var rowTemplate = _.template($("#monitor-row-container-template").html());
    var unitMonitorTemplate = _.template($("#unit-monitor-template").html());
    
    
};

$(document).ready(function () {
    var modelMonitor = new ModelMonitor();
    var modelManager = new ModelManagerV2();
});