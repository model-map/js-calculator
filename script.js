const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');
let expression=null;

const keys=['(', ')', '%', '/', '*', '-', '+', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysNum=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysOperators=['(', ')', '%', '/', '*', '-', '+', '.'];

// Event Listeners

    // CLICK
    buttons.forEach((button)=>{
        button.addEventListener("mousedown",(e)=>{
            expression=screen.textContent.trim(); // remove whitespace
            const dataKey= button.getAttribute('data-key');

            if(dataKey=='=') calculate(expression);
            else if (dataKey=='CE'){
                screen.textContent=screen.textContent.slice(0,-1);
            }
            else if (checkLength(expression)){
                if (expression.length==0 && keysNum.includes(dataKey))
                {screen.textContent+=dataKey;
            }
                else if(expression.length>0){
                    if (keysOperators.includes(dataKey)){
                        if (!keysOperators.includes(expression.slice(-1))){
                            screen.textContent+=dataKey;}
                    }
                    else screen.textContent+=dataKey;
                }
            }
        })
    })

    //Keyboard
    window.addEventListener("keydown",(e)=>{
        //console.log(e['key']);
        const key=e['key'];

        if (keys.includes(key)){
            e.preventDefault();         // prevents quick find associated with / button
            if(checkLength(screen.textContent)){
                screen.textContent+=key};
        }
        else if (key=='Backspace'){
            screen.textContent=screen.textContent.slice(0,-1);
        }
        else if (key=='=' || key=='Enter'){
            // Evaluate 
            calculate(expression);
        }
        expression=screen.textContent;


    })

// Functions


function checkLength (expression){
    expression=expression.trim();
    return expression.length<=40?true:false;
}

function calculate(expression){
    expression=expression.trim();
    console.log("Yeah i'll work soon dont worry :/ ");
    console.log("Here, meanwhile check if the expression is ok");
    console.log("-----------EXPRESSION----------");
    console.log(expression);

    // check expression
        // 1. should have numbers on first and last index
        // 2. should have at least two numbers and one operator
        //3. should have n numbers and n-1 operators

    console.log(checkExpression(expression));
    
    

}

function checkExpression(expression){
    return keysNum.includes(expression.slice(-1))?true:false;
}