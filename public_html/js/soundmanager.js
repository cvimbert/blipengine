
/* global _ */

var SoundManager = function (audioDatas) {

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();

    var sounds = [];

    var Sound = function (soundDef) {

        this.def = soundDef;
        var soundBuffer;

        var request = new XMLHttpRequest();
        request.open('GET', "audio/" + soundDef.file, true);
        request.responseType = 'arraybuffer';

        function onError(e) {
            console.log("erreur de chargement de son : " + soundDef.id);
        }

        // Decode asynchronously
        request.onload = function () {
            context.decodeAudioData(request.response, function (buffer) {
                soundBuffer = buffer;
            }, onError);
        };
        request.send();

        this.play = function () {
            var source = context.createBufferSource();
            source.buffer = soundBuffer;
            source.connect(context.destination);
            source.start(0);
        };
    };

    _.each(audioDatas.sounds, function (soundDef) {
        var snd = new Sound(soundDef);
        sounds[soundDef.id] = snd;
    });


    this.playSound = function (soundId) {
        var snd = sounds[soundId];
        snd.play();
    };

    return this;
};