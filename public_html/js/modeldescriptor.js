
var modelDescriptor = {
    Control: {
        id: "String",
        keyid: "ControlSprite"
    },
    Trigger: {
        id: "String",
        action: "Action",
        condition: "Condition",
        types: {
            controlclick: {
                control: "Control"
            },
            clock: {
            },
            sequencestepleave: {
                sequence: "Sequence",
                step: "GroupState"
            },
            sequencestepenter: {
                sequence: "Sequence",
                step: "GroupState"
            },
            endloop: {
                sequence: "Sequence"
            },
            spritescollision: {
                sprite1: "Sprite",
                sprite2: "Sprite"
            },
            timeinterval: {
                time: "Time"
            }
        }
    },
    Variable: {
        id: "String",
        types: {
            string: {
                value: "String"
            },
            number: {
                value: "Number"
            },
            boolean: {
                value: "Boolean"
            }
        }
    },
    ActionsList: {
        id: "String",
        actions: "Collection:Action"
    },
    RandomMode: {
        enum: ["sequence", "sequencen"]
    },
    Time: {
        value: "TimeValue"
    },
    GroupState: {
        id: "String"
    },
    ControlsList: {
        id: "String",
        controls: "Collection:Control"
    },
    Sprite: {
        id: "String",
        type: "SpriteFileReference",
        x: "Number",
        y: "Number"
    },
    ControlSprite: {
        id: "String",
        type: "ControlSpriteFileReference",
        x: "Number",
        y: "Number"
    },
    SoundFileReference: {
        filereference: "String"
    },
    SpriteFileReference: {
        filereference: "String"
    },
    ControlSpriteFileReference: {
        filereference: "String"
    },
    SpritesGroup: {
        id: "String",
        sprites: "Collection:Sprite"
    },
    Sequence: {
        id: "String",
        group: "SpritesGroup",
        loop: "String",
        steps: "Collection:GroupState"
    },
    TimeValue: {
        value: "String"
    },
    ArithmeticOperator: {
        enum: ["===", "!==", ">=", "<=", ">", "<"]
    },
    Sound: {
        id: "String",
        file: "SoundFileReference"
    },
    Action: {
        id: "String",
        types: {
            displaysprite: {
                sprite: "Sprite"
            },
            showgroup: {
                group: "SpritesGroup"
            },
            stopclock: {
            },
            startclock: {
            },
            hidegroup: {
                group: "SpritesGroup"
            },
            stopsequence: {
                sequence: "Sequence"
            },
            nextinsequence: {
                sequence: "Sequence"
            },
            previousinsequence: {
                sequence: "Sequence"
            },
            nextloop: {
                sequence: "Sequence"
            },
            randomaction: {
                actions: "ActionsList",
                randmode: "RandomMode"
            },
            incvariable: {
                variable: "Variable"
            },
            decvariable: {
                variable: "Variable"
            },
            setvariable: {
                variable: "Variable",
                types: {
                    string: {
                        value: "String"
                    },
                    number: {
                        value: "Number"
                    },
                    boolean: {
                        value: "Boolean"
                    }
                }
            },
            actions: {
                actions: "ActionsList"
            },
            resetsequence: {
                sequence: "Sequence"
            },
            togglestart: {
            },
            wait: {
                action: "Action",
                time: "TimeValue"
            },
            setsequencestep: {
                sequence: "Sequence",
                step: "GroupState"
            },
            setgroupstate: {
                grouprefresh: "Boolean",
                state: "GroupState"
            },
            disabletrigger: {
                trigger: "Trigger"
            },
            enabletrigger: {
                trigger: "Trigger"
            },
            disablecontrol: {
                control: "Control"
            },
            enablecontrol: {
                control: "Control"
            },
            enablecontrols: {
                controls: "ControlsList"
            },
            disablecontrols: {
                controls: "ControlsList"
            },
            playsound: {
                sound: "Sound"
            },
            cadencyup: {
                factor: "Number"
            }

        }
    },
    Condition: {
        id: "String",
        types: {
            variablecheck: {
                variable: "Variable",
                operator: "ArithmeticOperator",
                types: {
                    string: {
                        value: "String"
                    },
                    number: {
                        value: "Number"
                    },
                    boolean: {
                        value: "Boolean"
                    }
                }
            },
            sequencestep: {
                sequence: "Sequence",
                step: "GroupState"
            }
        }
    }
};