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
    $("#total").children().draggable({cancel: false});

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
            userInputs.push(userInput);
            total = eval(`${userInputs[0]} ${currentOperation} ${userInputs[1]}`);
            currentOperation = operation;
            userInputs.length = 0;
            userInput = "";
            userInputs.push(total);
            return;
        }
        switch(operation){
            case "+":
                performOperation(operation);
                break;
            case "-":
                performOperation(operation);
                break;
            case "*":
                performOperation(operation);
                break;
            case "/":
                performOperation(operation);
                break;
            case "=":
                if(userInput){
                    userInputs.push(userInput);
                }
                if(currentOperation && userInputs.length == 2){
                    switch(currentOperation){
                    case "+":
                        performOperationWithEqualSign(currentOperation);
                        break;
                    case "-":
                        performOperationWithEqualSign(currentOperation);
                        break;
                    case "*":
                        performOperationWithEqualSign(currentOperation);
                        break;
                    case "/":
                        performOperationWithEqualSign(currentOperation);
                        break;
                    }
                    userInput = "";
                    break;
                }
                break; 
            case "clear":
                userInputs.length = 0;
                userInput = "";
                total = 0;
                currentOperation = undefined;
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

});