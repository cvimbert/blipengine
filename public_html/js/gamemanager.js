/* global datas, _ */

window.registeredModules = [];

var GameManager = function (datas) {

    this.sprites = [];
    this.spritesList = [];
    this.groups = [];
    this.groupStates = [];
    this.sequences = [];

    this.variables = [];
    this.variablesList = [];
    this.controls = [];
    this.controlsList = [];
    this.actions = [];
    this.conditions = [];
    this.triggers = [];

    this.modules = [];

    this.conditionalGroupStates = [];

    var gameClock;
    var notificationsManager;
    var gameInitialized = false;

    var manager = this;

    var soundManager = new SoundManager(datas.audio);

    var NotificationListener = function () {

        var callbacks = [];
        var datas = [];

        function getId(type, key, value) {
            return type + "-" + key + "-" + value;
        }

        this.init = function () {
            callbacks = [];
            datas = [];
        };

        this.listen = function (type, key, value, callback, data) {
            var callid = getId(type, key, value);

            //console.log("listen: " + callid);

            if (callbacks[callid] === undefined) {
                callbacks[callid] = [];
            }

            callbacks[callid].push(callback);
        };

        this.stopListen = function (type, key, value, callb) {
            var callid = getId(type, key, value);

            if (callbacks[callid] !== undefined) {
                var ind = callbacks[callid].lastIndexOf(callb);

                if (ind !== -1) {
                    callbacks[callid].splice(ind, 1);
                }
            }
        };

        this.notify = function (type, key, value, data) {
            var callid = getId(type, key, value);

            if (callbacks[callid] !== undefined) {
                _.each(callbacks[callid], function (callb) {
                    callb(data);
                });
            }
        };
    };

    var Clock = function () {
        var interv;
        var initPeriod = 1000;
        var period = initPeriod;

        var callbacks = [];
        var enabled = false;
        var updateRequired = false;
        var clk = this;

        this.reset = function () {
            period = initPeriod;
            callbacks = [];
            updateRequired = false;
        };

        this.updatePeriod = function (fact) {
            period -= period * fact;
            updateRequired = true;
        };

        this.start = function () {
            enabled = true;

            if (!interv) {
                interv = setInterval(onInterval, period);
            }
        };

        this.stop = function () {
            enabled = false;
            clearInterval(interv);
            interv = null;
        };

        this.listen = function (callback) {
            callbacks.push(callback);
        };

        this.stopListen = function (callback) {
            var callIndex = callbacks.lastIndexOf(callback);
            callbacks.splice(callIndex, 1);
        };

        function onInterval() {
            _.each(callbacks, function (callb) {
                if (enabled) {
                    callb();
                    
                    //yep

                    if (updateRequired) {
                        clk.stop();
                        clk.start();
                        updateRequired = false;
                    }
                }

            });
        }
    };

    var Condition = function (condDef) {

        this.def = condDef;

        this.isConditionFulfilled = function () {

            switch (condDef.type) {
                case "variablecheck":

                    var vari = manager.variables[condDef.variable];
                    var evalStr = "";

                    if (vari.def.type === "string") {
                        evalStr = '"' + vari.value + '"';
                    } else {
                        evalStr = vari.value;
                    }

                    evalStr += condDef.operator;

                    if (vari.def.type === "string") {
                        evalStr += '"' + condDef.value + '"';
                    } else {
                        evalStr += condDef.value;
                    }

                    var res = eval(evalStr);
                    return res;

                case "groupstate":

                    break;

                case "sequencestep":
                    var seq = manager.sequences[condDef.sequence];
                    return seq.getCurrentStep().def.id === condDef.step;
            }
        };
    };

    var Variable = function (varDef) {

        this.def = varDef;
        var vari = this;

        this.initialValue = varDef.value;
        this.value = varDef.value;

        this.set = function (value) {
            vari.value = value;

            // envoi d'une notification de changement de variable
            notificationsManager.notify("variablechange", varDef.id, "", vari.value);
        };

        this.reset = function () {
            this.value = this.initialValue;
        };
    };

    var Control = function (contDef) {

        this.controlObj = $("#control-" + contDef.keyid);
        this.def = contDef;
        var enabled = true;

        this.enable = function () {
            enabled = true;
        };

        this.disable = function () {
            enabled = false;
        };

        this.setClickEvent = function (evtName, triggerDef) {
            var cond = manager.conditions[triggerDef.condition];
            var act = manager.actions[triggerDef.action];

            this.controlObj.on(evtName, function () {
                if (enabled) {
                    if (!cond || cond.isConditionFulfilled()) {
                        //console.log("control");
                        act.launch();
                    }
                }
            });
        };
    };

    var Trigger = function (triggerDef) {

        this.def = triggerDef;
        var act = manager.actions[triggerDef.action];
        var trigg = this;
        var enabled = true;
        var initialized = false;
        var intDisp;

        var cond;

        if (triggerDef.condition) {
            cond = manager.conditions[triggerDef.condition];
        }


        this.init = function () {

            if (initialized) {
                return;
            } else {
                console.log("init des triggers");
                initialized = true;
            }

            // temporaire
            switch (triggerDef.type) {
                case "controlclick":
                    var cont = manager.controls[triggerDef.control];
                    cont.setClickEvent("click", triggerDef);
                    break;

                case "clock":
                    gameClock.listen(function () {
                        if (!cond || cond.isConditionFulfilled()) {
                            act.launch();
                        }
                    });

                    break;

                    /*case "sequencestepchange":
                     
                     notificationsManager.listen(triggerDef.type, triggerDef.sequence, triggerDef.step, function (data) {
                     
                     });
                     
                     break;*/

                case "sequencestepleave":
                    notificationsManager.listen("sequencestepchange", triggerDef.sequence, "", function (data) {
                        if (data.from && data.from.def.id === triggerDef.step) {
                            manager.actions[triggerDef.action].launch();
                        }
                    });
                    break;

                case "sequencestepenter":
                    notificationsManager.listen("sequencestepchange", triggerDef.sequence, "", function (data) {
                        if (data.to && data.to.def.id === triggerDef.step) {
                            manager.actions[triggerDef.action].launch();
                        }
                    });
                    break;

                case "endloop":
                    notificationsManager.listen("endloop", triggerDef.sequence, "", function () {
                        manager.actions[triggerDef.action].launch();
                    });
                    break;

                case "spritescollision":

                    notificationsManager.listen("spriteenable", triggerDef.sprite1, "", function () {
                        var slave = manager.sprites[triggerDef.sprite2];
                        if (slave.getState()) {
                            manager.actions[triggerDef.action].launch();
                        }
                    });

                    notificationsManager.listen("spriteenable", triggerDef.sprite2, "", function () {
                        var master = manager.sprites[triggerDef.sprite1];
                        if (master.getState()) {
                            manager.actions[triggerDef.action].launch();
                        }
                    });

                    break;

                case "timeinterval":

                    function onTrigg() {
                        if (enabled) {
                            manager.actions[triggerDef.action].launch();
                        }
                    }

                    if (!intDisp) {
                        intDisp = new IntervalDispatcher();
                        intDisp.init(onTrigg, triggerDef.time);
                    }

                    intDisp.start();
                    break;

                case "collider":

                    break;
            }
        };

        this.disable = function () {
            // temporaire aussi, mais vide pour le moment
            enabled = false;

            switch (triggerDef.type) {
                case "timeinterval":
                    intDisp.pause();
                    break;
            }
        };

        this.enable = function () {
            enabled = true;

            switch (triggerDef.type) {
                case "timeinterval":
                    intDisp.start();
                    break;
            }
        };
    };

    var Action = function (actDef) {

        this.def = actDef;

        var cond;
        var randGenerator;

        if (actDef.condition) {
            cond = manager.conditions[actDef.condition];
        }

        this.launch = function () {

            if (cond) {

                //console.log("check : " + cond.def.id);

                if (!cond.isConditionFulfilled()) {
                    //console.log(cond.def.id + " : condition refusée");
                    return;
                } else {
                    //console.log(cond.def.id + " : condition acceptée");
                }
            }

            console.log("action : " + actDef.id + " (" + actDef.type + ")");

            switch (actDef.type) {
                case "displaysprite":
                    manager.sprites[actDef.sprite].enable();
                    break;

                case "showgroup":
                    manager.groups[actDef.group].showAll();
                    break;

                case "stopclock":
                    gameClock.stop();
                    break;

                case "startclock":
                    gameClock.start();
                    break;

                case "hidegroup":
                    manager.groups[actDef.group].hideAll();
                    break;

                case "stopsequence":
                    manager.sequences[actDef.sequence].stop();
                    break;

                case "nextinsequence":
                    manager.sequences[actDef.sequence].displayNext();
                    break;

                case "previousinsequence":
                    manager.sequences[actDef.sequence].displayPrevious();
                    break;

                case "nextloop":
                    manager.sequences[actDef.sequence].nextLoop();
                    break;

                case "randomaction":

                    if (!randGenerator) {
                        randGenerator = new RandomGenerator(actDef.randmode, actDef.actions);
                    }

                    var choosenActionId = randGenerator.getRandObject();
                    var choosenAction = manager.actions[choosenActionId];
                    choosenAction.launch();

                    break;

                case "incvariable":
                    var vari = manager.variables[actDef.variable];
                    vari.set(vari.value + 1);
                    break;

                case "decvariable":
                    var vari = manager.variables[actDef.variable];
                    vari.set(vari.value - 1);
                    break;

                case "setvariable":
                    manager.variables[actDef.variable].set(actDef.value);
                    break;

                case "actions":
                    _.each(actDef.actions, function (act) {
                        manager.actions[act].launch();
                    });
                    break;

                case "resetsequence":
                    manager.sequences[actDef.sequence].reset();
                    break;

                case "animiteration":
                    manager.sequences[actDef.sequence].launch(actDef.period, actDef.iterations, actDef.oncomplete, actDef.oniteration, actDef.onstep, actDef.stepnumber);
                    break;

                case "togglestart":
                    manager.toggleGameStart();
                    break;

                case "wait":
                    setTimeout(function () {
                        manager.actions[actDef.action].launch();
                    }, actDef.time);
                    break;

                case "setsequencestep":
                    manager.sequences[actDef.sequence].setState(actDef.step);
                    break;

                case "setgroupstate":
                    var refresh = actDef.grouprefresh;

                    if (!refresh) {
                        refresh = true;
                    }

                    manager.groupStates[actDef.state].show(refresh);
                    break;

                case "disabletrigger":
                    manager.triggers[actDef.trigger].disable();
                    break;

                case "enabletrigger":
                    manager.triggers[actDef.trigger].enable();
                    break;

                case "disablecontrol":
                    manager.controls[actDef.control].disable();
                    break;

                case "enablecontrol":
                    manager.controls[actDef.control].enable();
                    break;

                case "enablecontrols":
                    _.each(manager.controlsList, function (control) {
                        control.enable();
                    });
                    break;

                case "disablecontrols":
                    _.each(manager.controlsList, function (control) {
                        control.disable();
                    });
                    break;

                case "playsound":
                    soundManager.playSound(actDef.sound);
                    break;

                case "cadencyup":
                    gameClock.updatePeriod(actDef.factor);
                    break;
            }
        };
    };

    var Sprite = function (spriteDef) {

        this.spriteObj = $("#sprite-" + spriteDef.id);

        this.enable = function () {
            this.spriteObj.addClass("enabled");
            notificationsManager.notify("spriteenable", spriteDef.id, "");
        };

        this.disable = function () {
            this.spriteObj.removeClass("enabled");
        };

        this.getState = function () {
            return this.spriteObj.hasClass("enabled");
        };
    };

    var SpritesGroup = function (groupDef) {

        var sprites = [];

        //this.states = [];
        this.currentState = "";

        var spg = this;

        _.each(groupDef.sprites, function (spriteid) {
            sprites.push(manager.sprites[spriteid]);
        });

        this.showAll = function () {
            _.each(sprites, function (sprite) {
                sprite.enable();
            });
        };

        this.hideAll = function () {
            _.each(sprites, function (sprite) {
                sprite.disable();
            });
        };

        this.hasState = function (state) {
            //return spg.states.lastIndexOf(state) !== -1;

            return spg.currentState === state;
        };

        /*this.addState = function (state) {
         if (!spg.hasState(state)) {
         spg.states.push(state);
         }
         };
         
         this.removeState = function (state) {
         var ind = spg.states.lastIndexOf(state);
         
         if (ind !== -1) {
         spg.states.splice(ind, 1);
         }
         };*/
    };

    var ConditionalGroupState = function (cgsDef) {

        this.def = cgsDef;
        this.states = [];
        this.statesList = [];
        this.group = manager.groups[cgsDef.group];

        var cstate = this;

        _.each(cgsDef.states, function (state) {
            cstate.states[state] = new ConditionalState(state);
            cstate.statesList.push(cstate.states[state]);
        });

        this.defaultState = manager.groupStates[cgsDef.default.state];

        this.chooseState = function () {

            // choix du premier état remplissant ses conditions
            for (var i = 0; i < cstate.statesList.length; i++) {
                var state = cstate.statesList[i];

                if (state.condition.isConditionFulfilled()) {
                    return state.state;
                }
            }

            // cas par default
            return cstate.defaultState;
        };

        this.show = function (groupRefresh) {
            var choosenState = cstate.chooseState(groupRefresh);
            choosenState.show();
        };
    };

    var ConditionalState = function (csDef) {

        this.state = manager.groupStates[csDef.state];
        this.condition = manager.conditions[csDef.condition];
    };

    var GroupState = function (stateDef) {

        this.def = stateDef;
        var sprites = [];

        var gs = this;

        this.group = manager.groups[stateDef.group];

        _.each(stateDef.sprites, function (spriteid) {
            sprites.push(manager.sprites[spriteid]);
        });

        this.show = function (groupRefresh) {

            if (groupRefresh) {
                this.group.hideAll();
            }

            _.each(sprites, function (sprite) {
                sprite.enable();
            });
        };
    };

    var Module = function (modDef) {
        this.moduleObj = $("#module-" + modDef.id);

        this.def = modDef;
        this.modclass = new window.registeredModules[modDef.type](manager);

        this.modclass.initialize(modDef);
        this.moduleObj.html(this.modclass.display());
    };

    var Sequence = function (seqDef) {

        var steps = [];
        var currentStepIndex = 0;
        var loopDirection = "in";
        var animInterv;
        var currentStep;

        this.group = manager.groups[seqDef.group];

        var seq = this;

        _.each(seqDef.steps, function (stepid) {
            if (stepid !== "") {
                steps.push(manager.groupStates[stepid]);
            } else {
                steps.push(null);
            }
        });

        this.setState = function (stateId) {
            var st = manager.groupStates[stateId];
            var index = steps.lastIndexOf(st);

            currentStepIndex = index;
            displayIndex();
        };

        function displayIndex() {
            var step = steps[currentStepIndex];
            seq.group.hideAll();

            if (step) {
                step.show();
            }

            var data = {
                from: currentStep,
                to: step
            };

            notificationsManager.notify("sequencestepchange", seqDef.id, "", data);

            currentStep = step;
        }

        this.getCurrentStep = function () {
            return steps[currentStepIndex];
        };

        this.setCurrentStep = function (stepIndex) {
            currentStepIndex = stepIndex;
        };

        this.nextLoop = function () {
            if (loopDirection === "in") {
                if (!seq.displayNext()) {
                    loopDirection = "out";
                    seq.nextLoop();
                }
            } else if (loopDirection === "out") {
                if (!seq.displayPrevious()) {
                    loopDirection = "in";

                    notificationsManager.notify("endloop", seqDef.id, "");

                    seq.nextLoop();
                }
            }
        };

        this.displayNext = function () {
            if (currentStepIndex < steps.length - 1) {
                currentStepIndex++;
                displayIndex();
                return true;
            } else if (seqDef.loop === "reset") {
                currentStepIndex = 0;
                displayIndex();
                return true;
            }

            return false;
        };

        this.displayPrevious = function () {
            if (currentStepIndex > 0) {
                currentStepIndex--;
                displayIndex();
                return true;
            }

            return false;
        };

        var iterations;

        this.reset = function () {
            if (animInterv) {
                clearInterval(animInterv);
                animInterv = null;
            }

            seq.setCurrentStep(-1);
            seq.group.hideAll();
        };

        this.reinit = function () {
            this.reset();
            currentStepIndex = 0;
            currentStep = null;
            loopDirection = "in";
        };

        this.launch = function (time, maxIterations, oncomplete, oniteration, onstep, stepnumber) {
            iterations = 0;

            function launchStep() {
                // entre-t-on dans une nouvelle itération de la séquence ?
                if (currentStepIndex >= steps.length - 1) {
                    // nouvelle iteration
                    currentStepIndex = -1;
                    iterations++;

                    if (oniteration !== undefined) {
                        manager.actions[oniteration].launch();
                    }

                    if (iterations >= maxIterations) {
                        seq.stop();

                        if (oncomplete !== undefined) {
                            manager.actions[oncomplete].launch();
                        }
                    } else {
                        seq.displayNext();

                        if (onstep !== undefined) {
                            if (stepnumber === undefined || stepnumber === currentStepIndex) {
                                manager.actions[onstep].launch();
                            }
                        }
                    }
                } else {
                    seq.displayNext();

                    if (onstep !== undefined) {
                        if (stepnumber === undefined || stepnumber === currentStepIndex) {
                            manager.actions[onstep].launch();
                        }
                    }
                }
            }

            if (animInterv === undefined || animInterv === null) {
                currentStepIndex = -1;

                launchStep();

                animInterv = setInterval(launchStep, time);
            }
        };

        this.stop = function () {
            if (animInterv) {
                clearInterval(animInterv);
                currentStepIndex = -1;
                animInterv = null;
            }
        };

    };

    var obj = this;




    this.initDatas = function () {
        // indexation des données
        // 
        // sprites

        gameInitialized = true;

        obj.sprites = [];
        obj.spritesList = [];

        _.each(datas.layout.sprites, function (sp) {
            obj.sprites[sp.id] = new Sprite(sp);
            obj.spritesList.push(obj.sprites[sp.id]);
        });

        // groups
        obj.groups = [];

        _.each(datas.layout.groups, function (group) {
            obj.groups[group.id] = new SpritesGroup(group);
        });

        //group states

        obj.groupStates = [];

        _.each(datas.layout.groupstates, function (state) {
            obj.groupStates[state.id] = new GroupState(state);
        });

        // controls

        obj.controls = [];
        obj.controlsList = [];

        _.each(datas.controller.controls, function (cont) {
            obj.controls[cont.id] = new Control(cont);
            obj.controlsList.push(obj.controls[cont.id]);
        });

        // variables

        obj.variables = [];
        obj.variablesList = [];

        _.each(datas.controller.variables, function (variable) {
            obj.variables[variable.id] = new Variable(variable);
            obj.variablesList.push(obj.variables[variable.id]);
        });

        // conditions

        obj.conditions = [];

        _.each(datas.controller.conditions, function (cond) {
            obj.conditions[cond.id] = new Condition(cond);
        });

        // actions

        obj.actions = [];

        _.each(datas.controller.actions, function (act) {
            obj.actions[act.id] = new Action(act);
        });

        // conditional group states

        obj.conditionalGroupStates = [];

        _.each(datas.layout.conditionalgroupstates, function (cgs) {
            obj.conditionalGroupStates[cgs.id] = new ConditionalGroupState(cgs);
            obj.groupStates[cgs.id] = obj.conditionalGroupStates[cgs.id];
        });

        // sequences

        obj.sequences = [];

        _.each(datas.layout.sequences, function (seq) {
            obj.sequences[seq.id] = new Sequence(seq);
        });

        // triggers

        obj.triggers = [];

        _.each(datas.controller.triggers, function (trigger) {
            obj.triggers[trigger.id] = new Trigger(trigger);
        });

        // modules

        obj.modules = [];

        _.each(datas.layout.modules, function (module) {
            obj.modules[module.id] = new Module(module);
        });
    };


    notificationsManager = new NotificationListener();
    this.nmanager = notificationsManager;

    this.initDatas();


    var gameStarted = false;

    this.gameStart = function () {

        gameStarted = true;

        if (!gameClock) {
            gameClock = new Clock();
        }

        gameClock.reset();
        gameClock.start();

        _.each(datas.controller.gameinitactions, function (action) {
            manager.actions[action].launch();
        });

        _.each(manager.variablesList, function (vari) {
            vari.reset();
        });

        _.each(datas.controller.gameinittriggers, function (trigger) {
            try {
                manager.triggers[trigger].init();
            } catch (e) {
                console.warn(trigger.id);
            }
        });

        _.each(datas.controller.gameinitstates, function (state) {
            manager.groupStates[state].show();
        });
    };

    this.init = function () {
        _.each(datas.controller.inittriggers, function (trigger) {
            manager.triggers[trigger].init();
        });
    };


    this.toggleGameStart = function () {
        if (!gameStarted) {
            //if (!gameInitialized) {
            this.initDatas();
            //}
            this.gameStart();
        } else {
            this.gameStop();
        }
    };

    this.gameStop = function () {
        gameStarted = false;

        this.hideAll();

        _.each(manager.sequences, function (seq) {
            seq.reinit();
        });

        notificationsManager.init();

        gameClock.stop();
    };

    this.showAll = function () {
        _.each(obj.spritesList, function (sprite) {
            sprite.enable();
        });
    };

    this.hideAll = function () {
        _.each(obj.spritesList, function (sprite) {
            sprite.disable();
        });
    };

    this.init();

    //this.gameStart();
};


