const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');
let expression=null;

const keys=['/', '*', '-', '+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','=','Enter','Backspace','End','.'];
const keysNum=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysOperators=['/', '*', '-', '+'];

// Event Listeners

    // CLICK
    buttons.forEach((button)=>{
        button.addEventListener("mousedown",()=>{
            const key=button.getAttribute('data-key');
            setExpression(key);
    })
    })

    //Keyboard
    window.addEventListener("keydown",(e)=>{
        const key=e['key'];
        if (keys.includes(key)){
            e.preventDefault(); // Prevents quick find associated with /
            setExpression(key);
        }
    })

// Functions
function setExpression(key){
    expression=screen.textContent.trim(); // remove whitespace
        if (key=='=' || key=='Enter') calculate(expression);
        else if (key=='Backspace' || key=='CE') screen.textContent=screen.textContent.slice(0,-1);
        else if (key=='End'){
            expression=null;
            screen.textContent='';
        }
        else if (expression.length<=40){ // Max 40 chars allowed on screen
            if (expression.length==0 && keysNum.includes(key)) // Only allow number at expression beginning
            {screen.textContent+=key;
        }
            else if(expression.length>0){
                if (keysOperators.includes(key)){
                    if (!keysOperators.includes(expression.slice(-1))){ // Doesnt allow two operators in succession
                        screen.textContent+=key;}
                }
                else screen.textContent+=key;
            }
        }
}

function calculate(expression){

    if (checkExpression(expression)){
        expression=expression.split(/([\/\*\+\-])/);

        while(expression.length>1){
            keysOperators.forEach((operator)=>{
                if (expression.includes(operator)){
                    const index= expression.indexOf(operator);
                    const num1= expression[index-1];
                    const num2=expression[index+1];
                    const result= getResult(num1,operator,num2);
                    expression.splice(index-1,3,result);
                }
            })
        }

        screen.textContent=`${expression}`;
    }

    else{
        // when expression isnt valid
        // Add css to shake the screen a bit in red
    }
    

}

function checkExpression(expression){
    return keysNum.includes(expression.slice(-1))?true:false;
}

function getResult(num1,operator,num2){
    num1=parseFloat(num1);
    num2=parseFloat(num2);

    if (operator=='/') result=num1/num2;
    if (operator=="*") result=num1*num2;
    if (operator=='+') result=num1+num2;
    if (operator=='-') result=num1-num2;
    console.log(result);
    return result;
}