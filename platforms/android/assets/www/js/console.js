var GameConsole = function () {
    $("#console-prompt").on("keydown", onPromptKeyDown);
    $("body").on("keydown", callConsole);
    $("#console").hide();

    function onPromptKeyDown(e) {

        if (e.keyCode === 13) {
            // lancement d'une commande
            var cmdStr = $("#console-prompt").text();

            cmdStr = cmdStr.replace("\r", "");
            cmdStr = cmdStr.replace("\n", "");

            var cmdArr = cmdStr.split(" ");

            var cmdName = cmdArr[0];

            $("#console-prompt").text("");

            cmdArr.splice(0, 1);

            launchCommand(cmdStr, cmdName, cmdArr);
        }
    }
    ;


    function callConsole(e) {
        if (e.ctrlKey && e.altKey && e.keyCode === 75) {
            $("#console-prompt").focus();
            $("#console").show();
        }
    }


    function launchCommand(rawCmd, name, args) {
        $("#console-history").append(">" + rawCmd + "<br/>");

        switch (name) {
            case "group":
                window.gameManager.groups[args[0]].showAll();
                break;

            case "hidegroup":
                window.gameManager.groups[args[0]].hideAll();
                break;

            case "st":
                window.gameManager.groupStates[args[0]].show();
                break;

            case "sequence":
                window.gameManager.sequences[args[0]].launch(500);
                break;

            case "rsequence":
                window.gameManager.sequences[args[0]].reverseLaunch(500);
                break;

            case "showall":
                window.gameManager.showAll();
                break;

            case "hideall":
                window.gameManager.hideAll();
                break;
                
            case "condition":
                $("#console-history").append(String(window.gameManager.conditions[args[0]].isConditionFulfilled()));
                break;
                
            case "start":
                window.gameManager.gameStart();
                break;
                
            case "setvar":
                window.gameManager.variables[args[0]].value = args[1];
                break;
                
            case "stop":
                window.gameManager.gameStop();
                break
                
            case "action":
                window.gameManager.actions[args[0]].launch();
                break;

            default:
                $("#console-history").append("Commande inconnue<br/>");
        }
    }
    ;
};