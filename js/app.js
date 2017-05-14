$(function(){

    const userInputs = [];
    let userInput = "";
    let currentOperation;
    let total = 0;

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
            total = eval(`${userInputs[0]} ${currentOperation} ${userInputs[1]}`);
            currentOperation = operation;
            userInputs.length = 0;
            userInput = "";
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
                }
                if(currentOperation && userInputs.length == 2){
                    performOperationWithEqualSign(currentOperation);
                    userInput = "";
                }
                break;
            case "clear":
                resetState();
                break;
            default:
                userInput += operation;
        }
    }

    function performOperation(operation){
        if(userInputs.length < 2){
            if(userInput){
                userInputs.push(userInput);
            }
            currentOperation = operation;
            userInput = "";
            if(userInputs.length == 2){
                total = eval(`${userInputs[0]} ${operation} ${userInputs[1]}`);
                userInputs.length = 0;
                userInputs.push(total);
            }
        }
    }

    function performOperationWithEqualSign(operation){
        total = eval(`${userInputs[0]} ${operation} ${userInputs[1]}`);
        userInputs.length = 0;
        userInputs.push(total);
    }

    function resetState(){
        userInputs.length = 0;
        userInput = "";
        total = 0;
        currentOperation = undefined;
    }

    function handleDecimal(operation){
        if(!userInput){
            userInput = "0.";
        } else {
            if(userInput.includes(".")){
                return;
            }
            userInput += operation;
        }
        return;
    }

    function roundNumber(value, decimals) {
        const shifter = Math.pow(10, decimals);
        return Math.round(value * shifter) / shifter;
    }

});