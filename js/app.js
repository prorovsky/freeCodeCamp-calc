$(function(){
    const userInputs = [];

    var domFirstInput = $(".first-input"),
        domSecondInput = $(".second-input"),
        domOperation = $(".operation"),
        userInput = "",
        currentOperation,
        total = 0;

    $("#numbers").children().draggable({
        cancel: false, 
        helper: "clone"
    });
    $("#operations").children().draggable({
        cancel: false,
        helper: "clone"
    });

    $(".drop-area").droppable({
        classes: {
            "ui-droppable-active": "border"
        },
        drop: function(event, ui){
            checkOperation(ui.draggable[0].textContent);

            // console.log("Current operation: " + currentOperation);
            // console.log("Total: " + total);
            // console.log("Input: " + userInput);
            // console.log(userInputs);
        }
    });

    function checkOperation(operation){
        checkForSecondInput(operation);
        switch(operation){
            case "+":
            case "-":
            case "*":
            case "/":
                performOperation(operation);
                break;
            case ".":
                handleDecimal(operation);
                break;
            case "=":
                break;
            case "ce":
                resetState();
                break;
            default:
                userInput += operation;
                firstOrSecondInput();       
        }
    }

    function checkForSecondInput(operation){
        if(userInput && isNaN(operation) && userInputs.length == 1){
            if(operation == "ce"){
                resetState();
                return;
            }
            if(operation == "."){
                handleDecimal(operation);
                return;
            }
            userInputs.push(userInput);
            total = eval(`${userInputs[0]} ${currentOperation} ${userInputs[1]}`);
            const roundTotal = roundNumber(total, 6);
            if(operation == "="){
                domOperation.text("");
            } else {
                currentOperation = operation;
                domOperation.text(currentOperation);
            }
            userInputs.length = 0;
            userInput = "";
            domSecondInput.text("");
            userInputs.push(total);
            domFirstInput.text(roundTotal);
            return;
        }
    }

    function performOperation(operation){
        if(userInputs.length < 2){
            if(userInput){
                userInputs.push(userInput);
            }
            currentOperation = operation;
            domOperation.text(currentOperation);
            userInput = "";
        }
    }

    function resetState(){
        userInputs.length = 0;
        domSecondInput.text("");
        userInput = "";
        domFirstInput.text("");
        total = 0;
        currentOperation = undefined;
        domOperation.text("");
    }

    function handleDecimal(operation){
        if(!userInput){
            userInput = "0.";
            firstOrSecondInput();
        } else {
            if(userInput.includes(".")){
                return;
            }
            userInput += operation;
            firstOrSecondInput();
        }
        return;
    }

    function firstOrSecondInput(){
        if(userInputs.length == 0){
            domFirstInput.text(userInput);
        } else if(userInputs.length == 1){
            domSecondInput.text(userInput);
        }  
    }

    function roundNumber(value, decimals) {
        const shifter = Math.pow(10, decimals);
        return Math.round(value * shifter) / shifter;
    }
});