
var IntervalDispatcher = function () {
    
    var timeInterv;
    var pauseTimeout;
    var nextStepTime;
    var timeBeforeNextStep = 0;
    var lastTime;
    
    var pCallback;
    var pTime;
    
    this.init = function (callback, time) {
        pCallback = callback;
        pTime = time;
    };

    this.start = function () {
        pauseTimeout = setTimeout(pauseResume, timeBeforeNextStep);
    };

    this.pause = function () {
        clearInterval(timeInterv);
        clearTimeout(pauseTimeout);
        timeInterv = null;
        pauseTimeout = null;
        
        var dt = new Date();
        timeBeforeNextStep = nextStepTime - dt.getTime();
    };

    this.stop = function () {

    };
    
    function execCallback() {
        pCallback();
        var dt = new Date();
        lastTime = dt.getTime();
        nextStepTime = dt.getTime() + pTime;
    }
    
    function pauseResume() {
        pCallback();
        
        if (!timeInterv) {
            timeInterv = setInterval(execCallback, pTime);
        }
    }
};