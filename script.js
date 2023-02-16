const buttons=document.querySelectorAll(`[data-key]`);
const oldExpression= document.querySelector('#oldExpression');
const curExpression= document.querySelector('#curExpression');
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
    expression=curExpression.textContent.trim(); // remove whitespace
    expression=expression.split(/([\/\*\+\-])/);
        if (key=='=' || key=='Enter') calculate(expression);
        else if (key=='Backspace' || key=='CE') curExpression.textContent=curExpression.textContent.slice(0,-1);
        else if (key=='End'){
            expression=null;
            curExpression.textContent='';
        }
        else if (expression.length<=20){ // Max 40 chars allowed on curExpression
            if (key=='.'){
                if (!expression.slice(-1).join('').split('').includes('.')) curExpression.textContent+=key;
            }
            else if (expression.length==0 && keysNum.includes(key)) // Only allow number at expression beginning
            {curExpression.textContent+=key;
        }
            else if(expression.length>0){
                if (keysOperators.includes(key)){
                    if (!keysOperators.includes(expression.slice(-1))){ // Doesnt allow two operators in succession
                        curExpression.textContent+=key;}
                }
                else curExpression.textContent+=key;
            }
        }
}

function calculate(expression){
    if (checkExpression(expression)){
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

        oldExpression.textContent=`Ans= ${expression}`;
    }

    else{
        // when expression isnt valid
        // Add css to shake the curExpression a bit in red
    }
    

}

function checkExpression(expression){
    return keysOperators.includes(expression.slice(-1))?false:true; // if last input is operator then return false
}

function getResult(num1,operator,num2){
    if (operator=='/') result=num1/num2;
    if (operator=="*") result=multiply(num1,num2);
    if (operator=='+') result=add(num1,num2);
    if (operator=='-') result=subtract(num1,num2);
    console.log(result);
    return result;
}

function add(num1,num2){
    const round=getRoundNumber(num1,num2,'+');
    
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    return (num1+num2).toFixed(round);
}

function subtract(num1,num2){
    const round=getRoundNumber(num1,num2,'-');
    
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    return (num1-num2).toFixed(round);
}

function multiply(num1,num2){
    const round=getRoundNumber(num1,num2,'*');
    
    num1=parseFloat(num1);
    num2=parseFloat(num2);
    return (num1*num2).toFixed(round);
}

function getRoundNumber(num1,num2,operator){
    let round1=0;
    let round2=0;
    if (num1.includes('.')) round1+=num1.split('.').slice(-1).join('').length;
    if (num2.includes('.')) round2+=num2.split('.').slice(-1).join('').length;
    if (operator=='+' || operator=='-') return round1>round2?round1:round2;
    if (operator=='*') return round1+round2;
}