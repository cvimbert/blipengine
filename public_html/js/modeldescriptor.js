
var modelDescriptor = {
    Control: {
        id: String
    },
    Trigger: {
        id: String
    },
    Variable: {
        id: String
    },
    ActionsList: {
        id: String
    },
    RandomMode: {
        
    },
    Time: {
        value: String
    },
    GroupState: {
        
    },
    ControlsList: {
        
    },
    Sprite: {
        
    },
    SoundFileReference: {
        filereference: String
    },
    SpritesGroup: {
        
    },
    Sequence: {
        
    },
    TimeValue: {
        
    },
    ArithmeticOperator: {
        
    },
    Sound: {
        id: String,
        file: SoundFileReference
    },
    Action: {
        id: String,
        types: {
            displaysprite: {
                sprite: Sprite
            },
            showgroup: {
                group: SpritesGroup
            },
            stopclock: {
                
            },
            startclock: {
                
            },
            hidegroup: {
                group: SpritesGroup
            },
            stopsequence: {
                sequence: Sequence
            },
            nextinsequence: {
                sequence: Sequence
            },
            previousinsequence: {
                sequence: Sequence
            },
            nextloop: {
                sequence: Sequence
            },
            randomaction: {
                actions: ActionsList,
                randmode: RandomMode
            },
            incvariable: {
                variable: Variable
            },
            decvariable: {
                variable: Variable
            },
            setvariable: {
                variable: Variable,
                value: undefined
            },
            actions: {
                actions: ActionsList
            },
            resetsequence: {
                sequence: Sequence
            },
            togglestart: {
                
            },
            wait: {
                action: Action,
                time: TimeValue
            },
            setsequencestep: {
                sequence: Sequence,
                step: GroupState
            },
            setgroupstate: {
                grouprefresh: Boolean,
                state: GroupState
            },
            disabletrigger: {
                trigger: Trigger
            },
            enabletrigger: {
                trigger: Trigger
            },
            disablecontrol: {
                control: Control
            },
            enablecontrol: {
                control: Control
            },
            enablecontrols: {
                controls: ControlsList
            },
            disablecontrols: {
                controls: ControlsList
            },
            playsound: {
                sound: Sound
            },
            cadencyup: {
                factor: Number
            }
            
        }
    },
    Condition: {
        id: String,
        types: {
            variablecheck: {
                variable: Variable,
                operator: ArithmeticOperator,
                value: undefined
            },
            sequencestep: {
                sequence: Sequence,
                step: GroupState
            }
        }
    }
};