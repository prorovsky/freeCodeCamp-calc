$(function(){

    const userInputs = [];
    let userInput = "";
    let currentOperation;
    let total;

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
            operation = ui.draggable[0].textContent;
            switch(operation){
                case "+":
                    if(userInputs.length < 2){
                        userInputs.push(userInput);
                        currentOperation = "+";
                        userInput = "";
                        if(userInputs.length == 2){
                            total = +userInputs[0] + +userInputs[1];
                        }
                    }
                    break;
                case "-":
                    if(userInputs.length < 2){
                        userInputs.push(userInput);
                        currentOperation = "-";
                        userInput = "";
                        if(userInputs.length == 2){
                            total = +userInputs[0] - +userInputs[1];
                        }
                    }
                    break;
                case "*":
                    if(userInputs.length < 2){
                        userInputs.push(userInput);
                        currentOperation = "*";
                        userInput = "";
                        if(userInputs.length == 2){
                            total = +userInputs[0] * +userInputs[1];
                        }
                    }
                    break;
                case "/":
                    if(userInputs.length < 2){
                        userInputs.push(userInput);
                        currentOperation = "/";
                        userInput = "";
                        if(userInputs.length == 2){
                            total = +userInputs[0] / +userInputs[1];
                        }
                    }
                    break;
                case "=":
                    userInputs.push(userInput);
                    switch(currentOperation){
                        case "+":
                            total = +userInputs[0] + +userInputs[1];
                            break;
                        case "-":
                            total = +userInputs[0] - +userInputs[1];
                            break;
                        case "*":
                            total = +userInputs[0] * +userInputs[1];
                            break;
                        case "/":
                            total = +userInputs[0] / +userInputs[1];
                            break;
                    }
                    break;
                default:
                    userInput += operation;
            }

            console.log("Total " + total);
            console.log("Input " + userInput);
            console.log(userInputs);
            // console.log(ui.draggable[0].textContent);
            // console.log(ui.draggable[0].innerHTML);
        }
    });



});