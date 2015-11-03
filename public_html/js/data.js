var datas = {
    audio: {
        sounds: [
            {
                id: "blip",
                file: "blip.mp3"
            },
            {
                id: "bipaction",
                file: "takegold.mp3"
            },
            {
                id: "dropgold",
                file: "dropgold.mp3"
            },
            {
                id: "takegold",
                file: "takegold.mp3"
            },
            {
                id: "taken",
                file: "taken.mp3"
            },
            {
                id: "end",
                file: "end.mp3"
            },
            {
                id: "takenlong",
                file: "takenlong.mp3"
            },
            {
                id: "takenshort",
                file: "takenshort.mp3"
            }
        ]
    },
    layout: {
        modules: [
            {
                id: "scoredisplay",
                type: "seg7",
                variable: "score",
                x: 87,
                y: 9
            }
        ],
        background: [
            {
                id: "bg",
                type: "fond",
                x: 0,
                y: 0
            }
        ],
        foreground: [
        ],
        controls: [
            {
                id: "ba",
                type: "buttonA",
                x: 57,
                y: 302
            },
            {
                id: "bb",
                type: "buttonB",
                x: 663,
                y: 302
            },
            {
                id: "start",
                type: "start",
                x: 658,
                y: 51
            },
            {
                id: "start2",
                type: "start",
                x: 658,
                y: 103
            },
            {
                id: "start3",
                type: "start",
                x: 658,
                y: 157
            }
        ],
        sprites: [
            {
                id: "o-body",
                type: "o-body",
                x: 140,
                y: 54
            },
            {
                id: "o-t1",
                type: "o-t1",
                x: 111,
                y: 81
            },
            {
                id: "o-t1-1a",
                type: "o-t1-1a",
                x: 85,
                y: 81
            },
            {
                id: "o-t1-1b",
                type: "o-t1-1b",
                x: 97,
                y: 96
            },
            {
                id: "o-t1-2a",
                type: "o-t1-2a",
                x: 63,
                y: 75
            },
            {
                id: "o-t1-2b",
                type: "o-t1-2b",
                x: 87,
                y: 109
            },
            {
                id: "o-t1-3b",
                type: "o-t1-3b",
                x: 72,
                y: 125
            },
            {
                id: "o-t2-1",
                type: "o-t2-1",
                x: 154,
                y: 101
            },
            {
                id: "o-t2-2",
                type: "o-t2-2",
                x: 151,
                y: 114
            },
            {
                id: "o-t2-3",
                type: "o-t2-3",
                x: 146,
                y: 126
            },
            {
                id: "o-t2-4",
                type: "o-t2-4",
                x: 144,
                y: 145
            },
            {
                id: "o-t2-5",
                type: "o-t2-5",
                x: 135,
                y: 163
            },
            {
                id: "o-t3-1",
                type: "o-t3-1",
                x: 193,
                y: 123
            },
            {
                id: "o-t3-2",
                type: "o-t3-2",
                x: 193,
                y: 136
            },
            {
                id: "o-t3-3",
                type: "o-t3-3",
                x: 198,
                y: 150
            },
            {
                id: "o-t3-4",
                type: "o-t3-4",
                x: 196,
                y: 168
            },
            {
                id: "o-t4-1",
                type: "o-t4-1",
                x: 267,
                y: 141
            },
            {
                id: "o-t4-2",
                type: "o-t4-2",
                x: 275,
                y: 157
            },
            {
                id: "o-t4-3",
                type: "o-t4-3",
                x: 285,
                y: 173
            },
            {
                id: "p1-arm",
                type: "p1-arm",
                x: 51,
                y: 32
            },
            {
                id: "p1-bag",
                type: "p1-bag",
                x: 50,
                y: 17
            },
            {
                id: "p1-body",
                type: "p1-body",
                x: 24,
                y: 11
            },
            {
                id: "p2",
                type: "p2",
                x: 74,
                y: 11
            },
            {
                id: "p3",
                type: "p3",
                x: 104,
                y: 11
            },
            {
                id: "p4-bag",
                type: "p4-bag",
                x: 64,
                y: 95
            },
            {
                id: "p4-body",
                type: "p4-body",
                x: 23,
                y: 67
            },
            {
                id: "p5-bag",
                type: "p5-bag",
                x: 62,
                y: 171
            },
            {
                id: "p5-body",
                type: "p5-body",
                x: 34,
                y: 131
            },
            {
                id: "p6-bag",
                type: "p6-bag",
                x: 129,
                y: 207
            },
            {
                id: "p6-body",
                type: "p6-body",
                x: 90,
                y: 172
            },
            {
                id: "p7-bag",
                type: "p7-bag",
                x: 198,
                y: 205
            },
            {
                id: "p7-body",
                type: "p7-body",
                x: 159,
                y: 174
            },
            {
                id: "p8-arm1",
                type: "p8-arm1",
                x: 246,
                y: 194
            },
            {
                id: "p8-arm2",
                type: "p8-arm2",
                x: 272,
                y: 205
            },
            {
                id: "p8-arm3",
                type: "p8-arm3",
                x: 277,
                y: 201
            },
            {
                id: "p8-bag",
                type: "p8-bag",
                x: 227,
                y: 194
            },
            {
                id: "p8-body",
                type: "p8-body",
                x: 243,
                y: 178
            },
            {
                id: "p9-arm1",
                type: "p9-arm1",
                x: 189,
                y: 102
            },
            {
                id: "p9-arm2",
                type: "p9-arm2",
                x: 171,
                y: 140
            },
            {
                id: "p9-arm3",
                type: "p9-arm3",
                x: 183,
                y: 145
            },
            {
                id: "p9-head",
                type: "p9-head",
                x: 170,
                y: 114
            },
            {
                id: "p9-leg1",
                type: "p9-leg1",
                x: 219,
                y: 118
            },
            {
                id: "p9-leg2",
                type: "p9-leg2",
                x: 217,
                y: 127
            },
            {
                id: "p9-leg3",
                type: "p9-leg3",
                x: 214,
                y: 139
            },
            {
                id: "p9-leg4",
                type: "p9-leg4",
                x: 210,
                y: 144
            },
            {
                id: "p9-other",
                type: "p9-other",
                x: 161,
                y: 127
            }
        ],
        groups: [
            {
                id: "gr-o-body",
                sprites: ["o-body"]
            },
            {
                id: "gr-tent1",
                sprites: ["o-t1", "o-t1-1a", "o-t1-2a", "o-t1-1b", "o-t1-2b", "o-t1-3b"]
            },
            {
                id: "gr-tent2",
                sprites: ["o-t2-1", "o-t2-2", "o-t2-3", "o-t2-4", "o-t2-5"]
            },
            {
                id: "gr-tent3",
                sprites: ["o-t3-1", "o-t3-2", "o-t3-3", "o-t3-4"]
            },
            {
                id: "gr-tent2-taken",
                sprites: ["o-t2-1", "o-t2-2"]
            },
            {
                id: "gr-tent3-taken",
                sprites: ["o-t3-1", "o-t3-2"]
            },
            {
                id: "gr-tent4",
                sprites: ["o-t4-1", "o-t4-2", "o-t4-3"]
            },
            {
                id: "gr-p1",
                sprites: ["p1-body", "p1-bag", "p1-arm"]
            },
            {
                id: "gr-p23",
                sprites: ["p2", "p3"]
            },
            {
                id: "gr-p4",
                sprites: ["p4-body", "p4-bag"]
            },
            {
                id: "gr-p5",
                sprites: ["p5-body", "p5-bag"]
            },
            {
                id: "gr-p6",
                sprites: ["p6-body", "p6-bag"]
            },
            {
                id: "gr-p7",
                sprites: ["p7-body", "p7-bag"]
            },
            {
                id: "gr-p8",
                sprites: ["p8-body", "p8-bag", "p8-arm1", "p8-arm2", "p8-arm3"]
            },
            {
                id: "gr-p9",
                sprites: ["p9-head", "p9-arm1", "p9-arm2", "p9-arm3", "p9-leg1", "p9-leg2", "p9-leg3", "p9-leg4", "p9-other"]
            },
            {
                id: "gr-p9-anim",
                sprites: ["p9-arm2", "p9-arm3", "p9-leg1", "p9-leg2", "p9-leg3", "p9-leg4"]
            },
            {
                id: "gr-p9-fixed",
                sprites: ["p9-head", "p9-arm1", "p9-other"]
            },
            {
                id: "gr-pglobal",
                sprites: ["p1-body", "p1-bag", "p1-arm", "p4-body", "p4-bag", "p5-body", "p5-bag", "p6-body", "p6-bag", "p7-body", "p7-bag", "p8-body", "p8-bag", "p8-arm1", "p8-arm2", "p8-arm3"]
            },
            {
                id: "gr-p8-takegold",
                sprites: ["p8-arm1", "p8-arm2", "p8-arm3"]
            },
            {
                id: "gr-p1-dropgold",
                sprites: ["p1-arm", "p1-bag"]
            }
        ],
        globalStates: [
            {
            }
        ],
        groupstates: [
            {
                id: "p1-armup",
                group: "gr-pglobal",
                sprites: ["p1-body", "p1-bag"]
            },
            {
                id: "p1-armdown",
                group: "gr-pglobal",
                sprites: ["p1-body", "p1-arm"]
            },
            {
                id: "p1-nobag",
                group: "gr-pglobal",
                sprites: ["p1-body"]
            },
            {
                id: "p23-1",
                group: "gr-p23",
                sprites: ["p2", "p3"]
            },
            {
                id: "p23-2",
                group: "gr-p23",
                sprites: ["p2"]
            },
            {
                id: "p4-wbag",
                group: "gr-pglobal",
                sprites: ["p4-body"]
            },
            {
                id: "p4-bag",
                group: "gr-pglobal",
                sprites: ["p4-body", "p4-bag"]
            },
            {
                id: "p5-wbag",
                group: "gr-pglobal",
                sprites: ["p5-body"]
            },
            {
                id: "p5-bag",
                group: "gr-pglobal",
                sprites: ["p5-body", "p5-bag"]
            },
            {
                id: "p6-wbag",
                group: "gr-pglobal",
                sprites: ["p6-body"]
            },
            {
                id: "p6-bag",
                group: "gr-p6",
                sprites: ["p6-body", "p6-bag"]
            },
            {
                id: "p7-wbag",
                group: "gr-pglobal",
                sprites: ["p7-body"]
            },
            {
                id: "p7-bag",
                group: "gr-pglobal",
                sprites: ["p7-body", "p7-bag"]
            },
            {
                id: "p8-nobag",
                group: "gr-pglobal",
                sprites: ["p8-body"]
            },
            {
                id: "p8-bag",
                group: "gr-pglobal",
                sprites: ["p8-body", "p8-bag"]
            },
            {
                id: "p9-anim-1",
                group: "gr-p9-anim",
                sprites: ["p9-arm2", "p9-leg2", "p9-leg3"]
            },
            {
                id: "p9-anim-2",
                group: "gr-p9-anim",
                sprites: ["p9-arm3", "p9-leg1", "p9-leg4"]
            },
            {
                id: "tent1-1",
                group: "gr-tent1",
                sprites: ["o-t1"]
            },
            {
                id: "tent1-1a",
                group: "gr-tent1",
                sprites: ["o-t1", "o-t1-1a"]
            },
            {
                id: "tent1-2a",
                group: "gr-tent1",
                sprites: ["o-t1", "o-t1-1a", "o-t1-2a"]
            },
            {
                id: "tent1-1b",
                group: "gr-tent1",
                sprites: ["o-t1", "o-t1-1b"]
            },
            {
                id: "tent1-2b",
                group: "gr-tent1",
                sprites: ["o-t1", "o-t1-1b", "o-t1-2b"]
            },
            {
                id: "tent1-3b",
                group: "gr-tent1",
                sprites: ["o-t1", "o-t1-1b", "o-t1-2b", "o-t1-3b"]
            },
            {
                id: "tent2-1",
                group: "gr-tent2",
                sprites: ["o-t2-1"]
            },
            {
                id: "tent2-2",
                group: "gr-tent2",
                sprites: ["o-t2-1", "o-t2-2"]
            },
            {
                id: "tent2-3",
                group: "gr-tent2",
                sprites: ["o-t2-1", "o-t2-2", "o-t2-3"]
            },
            {
                id: "tent2-4",
                group: "gr-tent2",
                sprites: ["o-t2-1", "o-t2-2", "o-t2-3", "o-t2-4"]
            },
            {
                id: "tent2-5",
                group: "gr-tent2",
                sprites: ["o-t2-1", "o-t2-2", "o-t2-3", "o-t2-4", "o-t2-5"]
            },
            {
                id: "tent3-1",
                group: "gr-tent3",
                sprites: ["o-t3-1"]
            },
            {
                id: "tent3-2",
                group: "gr-tent3",
                sprites: ["o-t3-1", "o-t3-2"]
            },
            {
                id: "tent3-3",
                group: "gr-tent3",
                sprites: ["o-t3-1", "o-t3-2", "o-t3-3"]
            },
            {
                id: "tent3-4",
                group: "gr-tent3",
                sprites: ["o-t3-1", "o-t3-2", "o-t3-3", "o-t3-4"]
            },
            {
                id: "tent4-1",
                group: "gr-tent4",
                sprites: ["o-t4-1"]
            },
            {
                id: "tent4-2",
                group: "gr-tent4",
                sprites: ["o-t4-1", "o-t4-2"]
            },
            {
                id: "tent4-3",
                group: "gr-tent4",
                sprites: ["o-t4-1", "o-t4-2", "o-t4-3"]
            },
            {
                id: "p8-takegold-1",
                group: "gr-p8-takegold",
                sprites: ["p8-arm3"]
            },
            {
                id: "p8-takegold-2",
                group: "gr-p8-takegold",
                sprites: ["p8-arm2"]
            },
            {
                id: "p8-takegold-3",
                group: "gr-p8-takegold",
                sprites: ["p8-arm1"]
            },
            {
                id: "p1-dropgold-1",
                group: "gr-p1-dropgold",
                sprites: ["p1-bag"]
            },
            {
                id: "p1-dropgold-2",
                group: "gr-p1-dropgold",
                sprites: ["p1-arm"]
            }
        ],
        conditionalgroupstates: [
            {
                id: "p1",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p1-armup",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p1-nobag"
                }
            },
            {
                id: "p4",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p4-bag",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p4-wbag"
                }
            },
            {
                id: "p5",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p5-bag",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p5-wbag"
                }
            },
            {
                id: "p6",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p6-bag",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p6-wbag"
                }
            },
            {
                id: "p7",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p7-bag",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p7-wbag"
                }
            },
            {
                id: "p8",
                group: "gr-pglobal",
                states: [
                    {
                        state: "p8-bag",
                        condition: "hasgoldinbag"
                    }
                ],
                default: {
                    state: "p8-nobag"
                }
            }
        ],
        sequences: [
            {
                id: "seq-tent1a",
                group: "gr-tent1",
                loop: "circle",
                steps: ["", "tent1-1", "tent1-1a", "tent1-2a"]
            },
            {
                id: "seq-tent1b",
                group: "gr-tent1",
                loop: "circle",
                steps: ["", "tent1-1", "tent1-1b", "tent1-2b", "tent1-3b"]
            },
            {
                id: "seq-tent2",
                group: "gr-tent2",
                loop: "circle",
                steps: ["", "tent2-1", "tent2-2", "tent2-3", "tent2-4", "tent2-5"]
            },
            {
                id: "seq-tent3",
                group: "gr-tent3",
                loop: "circle",
                steps: ["", "tent3-1", "tent3-2", "tent3-3", "tent3-4"]
            },
            {
                id: "seq-tent4",
                group: "gr-tent4",
                loop: "circle",
                steps: ["", "tent4-1", "tent4-2", "tent4-3"]
            },
            {
                id: "perso",
                group: "gr-pglobal",
                steps: ["p1", "p4", "p5", "p6", "p7", "p8"]
            },
            {
                id: "p8-takegold",
                group: "gr-p8-takegold",
                loop: "reset",
                steps: ["p8-takegold-1", "p8-takegold-2", "p8-takegold-3", "p8-takegold-2"]
            },
            {
                id: "p9-anim",
                group: "gr-p9-anim",
                loop: "reset",
                steps: ["p9-anim-1", "p9-anim-2"]
            },
            {
                id: "p1-dropgold",
                group: "gr-p1-dropgold",
                loop: "reset",
                steps: ["p1-dropgold-2", "p1-dropgold-1", "p1-dropgold-2"]
            }
        ]
    },
    controller: {
        variables: [
            {
                id: "remaininglives",
                type: "int",
                value: 3
            },
            {
                id: "goldinbag",
                type: "int",
                value: 0
            },
            {
                id: "choosententacle",
                type: "string",
                value: "a"
            },
            {
                id: "score",
                type: "int",
                value: 0
            }
        ],
        controls: [
            {
                id: "controlA",
                type: "control",
                keyid: "ba"
            },
            {
                id: "controlB",
                type: "control",
                keyid: "bb"
            },
            {
                id: "start",
                type: "control",
                keyid: "start"
            }
        ],
        actions: [
            {
                id: "displayoctopus",
                type: "displaysprite",
                sprite: "o-body"
            },
            {
                id: "goright",
                type: "nextinsequence",
                sequence: "perso"
            },
            {
                id: "goleft",
                type: "previousinsequence",
                sequence: "perso"
            },
            {
                id: "grow-t1a",
                type: "nextloop",
                condition: "tentacle1a",
                sequence: "seq-tent1a"
            },
            {
                id: "grow-t1b",
                type: "nextloop",
                condition: "tentacle1b",
                sequence: "seq-tent1b"
            },
            {
                id: "grow-t2",
                type: "nextloop",
                sequence: "seq-tent2"
            },
            {
                id: "grow-t3",
                type: "nextloop",
                sequence: "seq-tent3"
            },
            {
                id: "grow-t4",
                type: "nextloop",
                sequence: "seq-tent4"
            },
            {
                id: "grow-t1",
                type: "actions",
                actions: ["grow-t1a", "grow-t1b"]
            },
            {
                id: "grow-t",
                type: "randomaction",
                randmode: "sequence",
                actions: ["grow-t1", "grow-t2", "grow-t3", "grow-t4"]
            },
            {
                id: "getgold",
                type: "actions",
                actions: ["addgold", "anim-p8"]
            },
            {
                id: "anim-p8",
                type: "animiteration",
                period: 200,
                sequence: "p8-takegold",
                iterations: 1,
                //oncomplete: "anim-p8-complete",
                onstep: "anim-p8-complete",
                stepnumber: 3
            },
            {
                id: "dropgold",
                type: "actions",
                condition: "hasgoldinbag",
                actions: ["removegold", "disablecontrols", "anim-p1"]
            },
            {
                id: "anim-p1",
                type: "animiteration",
                sequence: "p1-dropgold",
                period: 300,
                iterations: 1,
                //oniteration: "dropgoldcredit",
                onstep: "onanim-p1-iteration",
                oncomplete: "enablecontrols"
            },
            {
                id: "onanim-p1-iteration",
                type: "actions",
                actions: ["dropgoldcredit", "playtakegold"]
            },
            {
                id: "dropgoldcredit",
                type: "incvariable",
                variable: "score"
            },
            {
                id: "addgold",
                type: "incvariable",
                variable: "goldinbag"
            },
            {
                id: "removegold",
                type: "setvariable",
                variable: "goldinbag",
                value: 0
            },
            {
                id: "reset-anim-p8",
                type: "resetsequence",
                sequence: "p8-takegold"
            },
            {
                id: "choosetentacle",
                type: "randomaction",
                actions: ["acts-tent1a", "acts-tent1b"]
            },
            {
                id: "acts-tent1a",
                type: "actions",
                actions: ["choosetentacle1a", "reset-tent1b"]
            },
            {
                id: "acts-tent1b",
                type: "actions",
                actions: ["choosetentacle1b", "reset-tent1a"]
            },
            {
                id: "reset-tent1b",
                type: "resetsequence",
                sequence: "seq-tent1b"
            },
            {
                id: "reset-tent1a",
                type: "resetsequence",
                sequence: "seq-tent1a"
            },
            {
                id: "choosetentacle1a",
                type: "setvariable",
                variable: "choosententacle",
                value: "a"
            },
            {
                id: "choosetentacle1b",
                type: "setvariable",
                variable: "choosententacle",
                value: "b"
            },
            {
                id: "anim-p8-complete",
                type: "actions",
                actions: ["incscore", "playtakegold", "update-p8-bag"]
            },
            {
                id: "incscore",
                type: "incvariable",
                variable: "score"
            },
            {
                id: "beforetakeperso",
                type: "actions",
                actions: ["stopmainclock", "disablecontrols", "waitbeforetakeperso", "playtakenlong", "disablecadencyup"]
            },
            {
                id: "playtakenlong",
                type: "playsound",
                sound: "takenlong"
            },
            {
                id: "playtakenshort",
                type: "playsound",
                sound: "takenshort"
            },
            {
                id: "waitbeforetakeperso",
                type: "wait",
                time: 700,
                action: "takeperso"
            },
            {
                id: "disablecadencyup",
                type: "disabletrigger",
                trigger: "cadencyuptrigger"
            },
            {
                id: "enablecadencyup",
                type: "enabletrigger",
                trigger: "cadencyuptrigger"
            },
            {
                id: "disablecontrols",
                type: "disablecontrols"
            },
            {
                id: "enablecontrols",
                type: "enablecontrols"
            },
            {
                id: "takeperso",
                type: "actions",
                actions: ["stoptent2", "stoptent3", "showtent2", "showtent3", "resetperso", "viewp9fixed", "anim-p9", "reset-anim-p8"]
            },
            {
                id: "reset-anim-p8",
                type: "resetsequence",
                sequence: "p8-takegold"
            },
            {
                id: "aftertakeperso",
                type: "wait",
                time: 1000,
                action: "newlife"

            },
            {
                id: "newlife",
                type: "actions",
                actions: ["declives", "2lives", "1life", "nolife", "enablecontrols", "enablecadencyup"]
            },
            {
                id: "resetperso2",
                type: "setsequencestep",
                sequence: "perso",
                step: "p1"
            },
            {
                id: "restart",
                type: "actions",
                actions: ["resetgoldinbag", "hidetaken", "resetperso2", "restartmainclock"]
            },
            {
                id: "resetgoldinbag",
                type: "setvariable",
                variable: "goldinbag",
                value: 0
            },
            {
                id: "2lives",
                type: "actions",
                condition: "has2lives",
                actions: ["setlifeindicator1", "restart"]
            },
            {
                id: "hidetaken",
                type: "hidegroup",
                group: "gr-p9"
            },
            {
                id: "setlifeindicator1",
                type: "setgroupstate",
                state: "p23-2"
            },
            {
                id: "1life",
                type: "actions",
                condition: "has1life",
                actions: ["setlifeindicator0", "restart"]
            },
            {
                id: "setlifeindicator0",
                type: "hidegroup",
                group: "gr-p23"
            },
            {
                id: "nolife",
                type: "actions",
                condition: "hasnolife",
                actions: []
            },
            {
                id: "declives",
                type: "decvariable",
                variable: "remaininglives"
            },
            {
                id: "viewp9fixed",
                type: "showgroup",
                group: "gr-p9-fixed"
            },
            {
                id: "anim-p9",
                type: "animiteration",
                sequence: "p9-anim",
                period: 320,
                iterations: 4,
                onstep: "playtakenshort",
                oncomplete: "aftertakeperso"
            },
            {
                id: "resetperso",
                type: "resetsequence",
                sequence: "perso"
            },
            {
                id: "stoptent1a",
                type: "stopsequence",
                sequence: "seq-tent1a"
            },
            {
                id: "stoptent1b",
                type: "stopsequence",
                sequence: "seq-tent1b"
            },
            {
                id: "stoptent2",
                type: "resetsequence",
                sequence: "seq-tent2"
            },
            {
                id: "stoptent3",
                type: "resetsequence",
                sequence: "seq-tent3"
            },
            {
                id: "stoptent4",
                type: "stopsequence",
                sequence: "seq-tent4"
            },
            {
                id: "stopmainclock",
                type: "stopclock"
            },
            {
                id: "restartmainclock",
                type: "startclock"
            },
            {
                id: "showtent2",
                type: "setsequencestep",
                sequence: "seq-tent2",
                step: "tent2-2"
            },
            {
                id: "showtent3",
                type: "setsequencestep",
                sequence: "seq-tent3",
                step: "tent3-2"
            },
            {
                id: "startgame",
                type: "togglestart"
            },
            {
                id: "initscore",
                type: "setvariable",
                variable: "score",
                value: 0
            },
            {
                id: "playblip",
                type: "playsound",
                sound: "blip"
            },
            {
                id: "playtakegold",
                type: "playsound",
                sound: "takegold"
            },
            {
                id: "playdropgold",
                type: "playsound",
                sound: "dropgold"
            },
            {
                id: "playtaken",
                type: "playsound",
                sound: "taken"
            },
            {
                id: "playend",
                type: "playsound",
                sound: "end"
            },
            {
                id: "cadencyup",
                type: "cadencyup",
                factor: 0.07
            },
            {
                id: "update-p8-bag",
                type: "setgroupstate",
                grouprefresh: false,
                state: "p8"
            }
        ],
        conditions: [
            {
                id: "isonboat",
                type: "sequencestep",
                sequence: "perso",
                step: "p1"
            },
            {
                id: "isbygold",
                type: "sequencestep",
                sequence: "perso",
                step: "p8"
            },
            {
                id: "hasgoldinbag",
                type: "variablecheck",
                variable: "goldinbag",
                operator: ">",
                value: 0
            },
            {
                id: "tentacle1a",
                type: "variablecheck",
                variable: "choosententacle",
                operator: "===",
                value: "a"
            },
            {
                id: "tentacle1b",
                type: "variablecheck",
                variable: "choosententacle",
                operator: "===",
                value: "b"
            },
            {
                id: "has2lives",
                type: "variablecheck",
                variable: "remaininglives",
                operator: "===",
                value: 2
            },
            {
                id: "has1life",
                type: "variablecheck",
                variable: "remaininglives",
                operator: "===",
                value: 1
            },
            {
                id: "hasnolife",
                type: "variablecheck",
                variable: "remaininglives",
                operator: "===",
                value: 0
            }
        ],
        triggers: [
            {
                id: "getgold",
                type: "controlclick",
                control: "controlB",
                condition: "isbygold",
                action: "getgold"
            },
            {
                id: "dropgold",
                type: "controlclick",
                control: "controlA",
                condition: "isonboat",
                action: "dropgold"
            },
            {
                id: "goright",
                type: "controlclick",
                control: "controlB",
                action: "goright"
            },
            {
                id: "start",
                type: "controlclick",
                control: "start",
                action: "startgame"
            },
            {
                id: "start2",
                type: "controlclick",
                control: "start2",
                action: "startgame"
            },
            {
                id: "start3",
                type: "controlclick",
                control: "start3",
                action: "startgame"
            },
            {
                id: "goleft",
                type: "controlclick",
                control: "controlA",
                action: "goleft"
            },
            {
                id: "resetp8",
                type: "sequencestepleave",
                sequence: "perso",
                step: "p8",
                action: "reset-anim-p8"
            },
            {
                id: "endloop-t1a",
                type: "endloop",
                sequence: "seq-tent1a",
                action: "choosetentacle"
            },
            {
                id: "endloop-t1b",
                type: "endloop",
                sequence: "seq-tent1b",
                action: "choosetentacle"
            },
            {
                id: "grow",
                type: "clock",
                action: "grow-t"
            },
            {
                id: "playblip",
                type: "clock",
                action: "playblip"
            },
            /*{
                id: "t1a-grow",
                type: "clock",
                condition: "tentacle1a",
                action: "grow-t1a"
            },
            {
                id: "t1b-grow",
                type: "clock",
                condition: "tentacle1b",
                action: "grow-t1b"
            },
            {
                id: "t2-grow",
                type: "clock",
                action: "grow-t2"
            },
            {
                id: "t3-grow",
                type: "clock",
                action: "grow-t3"
            },
            {
                id: "t4-grow",
                type: "clock",
                action: "grow-t4"
            },*/
            {
                id: "collider-t2",
                type: "spritescollision",
                sprite1: "o-t2-5",
                sprite2: "p6-body",
                action: "beforetakeperso"
            },
            {
                id: "collider-t1a",
                type: "spritescollision",
                sprite1: "o-t1-2a",
                sprite2: "p4-body",
                action: "beforetakeperso"
            },
            {
                id: "collider-t1b",
                type: "spritescollision",
                sprite1: "o-t1-3b",
                sprite2: "p5-body",
                action: "beforetakeperso"
            },
            {
                id: "collider-t3",
                type: "spritescollision",
                sprite1: "o-t3-4",
                sprite2: "p7-body",
                action: "beforetakeperso"
            },
            {
                id: "collider-t4",
                type: "spritescollision",
                sprite1: "o-t4-3",
                sprite2: "p8-body",
                action: "beforetakeperso"
            },
            {
                id: "cadencyuptrigger",
                type: "timeinterval",
                time: 5000,
                action: "cadencyup"
            }

            /*,
             {
             id: "t1-grow",
             type: "interval",
             time: 200
             },
             {
             id: "t2-grow",
             type: "interval",
             time: 200
             },
             {
             id: "t3-grow",
             type: "interval",
             time: 200
             },
             {
             id: "t4-grow",
             type: "interval",
             time: 200
             }*/
        ],
        gameinitactions: ["displayoctopus", "initscore"],
        gameinittriggers: ["getgold", "dropgold", "goright", "goleft", "resetp8", "grow", "endloop-t1a", "endloop-t1b", "collider-t1a", "collider-t1b", "collider-t2", "collider-t3", "collider-t4", "playblip", "cadencyuptrigger"],
        gameinitstates: ["p23-1", "p1"],
        inittriggers: ["start"]
    }
};