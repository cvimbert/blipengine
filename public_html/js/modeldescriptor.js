
var modelDescriptor = {
    Sound: {
        id: "String",
        file: FileReference
    },
    Action: {
        id: "String",
        types: {
            displaysprite: {
                sprite: Sprite
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
                value: "*"
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
                time: "Time"
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
                sound: Sound
            },
            cadencyup: {
                factor: Number
            }
            
        }
    },
    Condition: {
        id: "String"
    },
    Control: {
        id: "String"
    },
    Trigger: {
        id: "String"
    },
    Variable: {
        id: "String"
    },
    ActionsList: {
        
    },
    RandomMode: {
        
    },
    Time: {
        
    },
    GroupState: {
        
    },
    ControlsList: {
        
    },
    Sprite: {
        
    }
};