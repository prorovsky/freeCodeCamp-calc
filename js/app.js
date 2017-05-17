$(function(){

    var domFirstInput = $(".first-input");
    var domSecondInput = $(".second-input");
    var domInputTotal = $(".total");
    var domOperation = $(".operation");

    const userInputs = [];
    var userInput = "";
    var currentOperation;
    var total = 0;

    $("#numbers").children().draggable({
        cancel: false, 
        helper: "clone"
    });
    $("#operations").children().draggable({
        cancel: false,
        helper: "clone"
    });

    $(".drop-area").droppable({
        drop: function(event, ui){
            checkOperation(ui.draggable[0].textContent);

            console.log("Current operation: " + currentOperation);
            console.log("Total: " + total);
            console.log("Input: " + userInput);
            console.log(userInputs);
        }
    });

    function checkOperation(operation){
        if(userInput && isNaN(operation) && userInputs.length == 1){
            if(operation == "clear"){
                resetState();
                return;
            }
            if(operation == "."){
                handleDecimal(operation);
                return;
            }
            userInputs.push(userInput);
            domSecondInput.text(userInputs[0]);
            total = eval(`${userInputs[0]} ${currentOperation} ${userInputs[1]}`);
            domInputTotal.text(total);
            if(operation != "="){
                currentOperation = operation;
            }
            userInputs.length = 0;
            userInput = "";
            domFirstInput.text(userInput);
            userInputs.push(roundNumber(total, 3));
            return;
        }
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
                if(userInput){
                    userInputs.push(userInput);
                    domSecondInput.text(userInputs[0]);
                }
                if(currentOperation && userInputs.length == 2){
                    performOperationWithEqualSign(currentOperation);
                    userInput = "";
                    domFirstInput.text(userInput);
                }
                break;
            case "clear":
                resetState();
                break;
            default:
                userInput += operation;
                domFirstInput.text(userInput);
        }
    }

    function performOperation(operation){
        if(userInputs.length < 2){
            if(userInput){
                userInputs.push(userInput);
                // domSecondInput.text(userInputs[0]);
            }
            currentOperation = operation;
            domOperation.text(currentOperation);
            userInput = "";
            if(userInputs.length == 2){
                total = eval(`${userInputs[0]} ${operation} ${userInputs[1]}`);
                domInputTotal.text(total);
                userInputs.length = 0;
                userInputs.push(total);
                domSecondInput.text(userInputs[0]);
            }
        }
    }

    function performOperationWithEqualSign(operation){
        total = eval(`${userInputs[0]} ${operation} ${userInputs[1]}`);
        domInputTotal.text(total);
        userInputs.length = 0;
        domSecondInput.text("");
        userInputs.push(total);
    }

    function resetState(){
        userInputs.length = 0;
        domSecondInput.text("");
        userInput = "";
        domFirstInput.text(userInput);
        total = 0;
        domInputTotal.text("");
        currentOperation = undefined;
        domOperation.text("");
    }

    function handleDecimal(operation){
        if(!userInput){
            userInput = "0.";
        } else {
            if(userInput.includes(".")){
                return;
            }
            userInput += operation;
            domFirstInput.text(userInput);
        }
        return;
    }

    function roundNumber(value, decimals) {
        const shifter = Math.pow(10, decimals);
        return Math.round(value * shifter) / shifter;
    }

});