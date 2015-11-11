
var modelDescriptor = {
    Control: {
        indexable: true,
        attributes: {
            keyid: {
                type: "ControlSprite",
                optional: false
            },
            name: {
                type: "String",
                optional: false
            },
            test: {
                type: "Collection",
                collectiontype: "Trigger",
                optional: false
            },
            type: {
                type1: {
                    sprite: {
                        type: "Sprite",
                        optional: true
                    },
                    condition: {
                        type: "Condition",
                        optional: true
                    }

                }
            }
        }
    },
    Trigger: {
        indexable: true,
        id: "String",
        action: "Action",
        condition: "Condition:optional",
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
                time: "Number"
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
        time: "TimeValue"
    },
    GroupState: {
        indexable: true,
        id: "String",
        group: "SpritesGroup",
        sprites: "Collection:Sprite"
    },
    ConditionalGroupState: {
        indexable: true,
        id: "String",
        group: "SpritesGroup",
        states: "Collection:ConditionalGroupStateSet",
        defaultstate: "GroupState"
    },
    ConditionalGroupStateSet: {
        indexable: false,
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
    Background: {
        indexable: true,
        id: "String",
        type: "DecorationFileReference",
        x: "Number",
        y: "Number"
    },
    Foreground: {
        indexable: true,
        id: "String",
        type: "DecorationFileReference",
        x: "Number",
        y: "Number"
    },
    ControlSprite: {
        indexable: true,
        id: "String",
        type: "ControlFileReference",
        x: "Number",
        y: "Number"
    },
    SoundFileReference: {
        indexable: true,
        file: "String",
        package: "String"
    },
    SpriteFileReference: {
        indexable: true,
        file: "String",
        package: "String"
    },
    ControlFileReference: {
        indexable: true,
        file: "String"
    },
    DecorationFileReference: {
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
                actions: "Collection:Action",
                randmode: "RandomMode:optional"
            },
            incvariable: {
                variable: "Variable"
            },
            decvariable: {
                variable: "Variable"
            },
            setvariable: {
                variable: "Variable",
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
            actions: {
                actions: "Collection:Action"
            },
            resetsequence: {
                sequence: "Sequence"
            },
            animiteration: {
                sequence: "Sequence",
                period: "Number",
                iterations: "Number",
                stepnumber: "Number:optional",
                oniteration: "Action:optional",
                onstep: "Action:optional",
                oncomplete: "Action:optional"
            },
            togglestart: {
            },
            wait: {
                action: "Action",
                time: "Number"
            },
            setsequencestep: {
                sequence: "Sequence",
                step: "GroupState"
            },
            setgroupstate: {
                grouprefresh: "Boolean:optional",
                state: "ConditionalGroupState"
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
            },
            disablecontrols: {
            },
            playsound: {
                sound: "SoundFileReference"
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
                step: "ConditionalGroupState"
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