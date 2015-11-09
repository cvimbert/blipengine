
var modelDescriptor = {
    Control: {
        indexable: true,
        id: "String",
        keyid: "ControlSprite"
    },
    Trigger: {
        indexable: true,
        id: "String",
        action: "Action",
        condition: "Condition",
        type: {
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
                time: "TimeValue"
            }
        }
    },
    Variable: {
        indexable: true,
        id: "String",
        type: {
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
        indexable: false,
        id: "String",
        actions: "Collection:Action"
    },
    RandomMode: {
        indexable: false,
        value: ["sequence", "sequencen"]
    },
    Time: {
        indexable: false,
        value: "TimeValue"
    },
    GroupState: {
        indexable: true,
        id: "String",
        group: "Group",
        sprites: "Collection:Sprite"
    },
    ConditionalGroupStateSet: {
        indexable: true,
        id: "String",
        group: "Group",
        states: "Collection:ConditionalGroupState",
        defaultstate: "ConditionalGroupState"
    },
    ConditionalGroupState: {
        indexable: true,
        id: "String",
        state: "GroupState",
        condition: "Condition"
    },
    ControlsList: {
        indexable: false,
        id: "String",
        controls: "Collection:Control"
    },
    Sprite: {
        indexable: true,
        id: "String",
        type: "SpriteFileReference",
        x: "Number",
        y: "Number"
    },
    ControlSprite: {
        indexable: true,
        id: "String",
        type: "ControlSpriteFileReference",
        x: "Number",
        y: "Number"
    },
    SoundFileReference: {
        indexable: true,
        file: "String"
    },
    SpriteFileReference: {
        indexable: true,
        file: "String"
    },
    ControlSpriteFileReference: {
        indexable: true,
        file: "String"
    },
    SpritesGroup: {
        indexable: true,
        id: "String",
        sprites: "Collection:Sprite"
    },
    Sequence: {
        indexable: true,
        id: "String",
        group: "SpritesGroup",
        loop: "String",
        steps: "Collection:GroupState"
    },
    TimeValue: {
        indexable: false,
        value: "String"
    },
    ArithmeticOperator: {
        indexable: false,
        value: ["===", "!==", ">=", "<=", ">", "<"]
    },
    Sound: {
        indexable: true,
        id: "String",
        file: "SoundFileReference"
    },
    Action: {
        indexable: true,
        id: "String",
        type: {
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
                type: {
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
        indexable: true,
        id: "String",
        type: {
            variablecheck: {
                variable: "Variable",
                operator: "ArithmeticOperator",
                variabletype: {
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
    },
    Number: {
        indexable: false
    },
    String: {
        indexable: false
    },
    Boolean: {
        indexable: false
    }
};