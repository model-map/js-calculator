const buttons=document.querySelectorAll(`[data-key]`);
const oldExpression= document.querySelector('#oldExpression');
const curExpression= document.querySelector('#curExpression');
curExpression.textContent='0';
let expression=null;

const keys=['/', '*', '%', '-', '+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','=','Enter','Backspace','End','.'];
const keysNum=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysOperators=['/', '*', '-', '+','%'];

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
    expression=expression.split(/([\/\*\+\-\%])/);
    expression.forEach((item)=>{
        if (item==''){
            const index=expression.indexOf(item);
            expression.splice(index,1);                 // remove unintended '' added by regex
        }
    });
    console.log(expression);
        if (key=='=' || key=='Enter') calculate(expression);
        else if (key=='Backspace' || key=='CE') curExpression.textContent=curExpression.textContent.slice(0,-1);
        else if (key=='End'){
            expression=null;
            curExpression.textContent='0';
            oldExpression.textContent='';
        }
        else if (expression.length<=20){ // Max 40 chars allowed on curExpression
            if (key=='.'){
                console.log(expression);
                if (!expression.slice(-1).join('').split('').includes('.')) curExpression.textContent+=key;
            }
            else if (key=='%'){
                const lastInput=expression.slice(-1).join('').split('').slice(-1).join('');
                if (keysNum.includes(lastInput)) {
                    curExpression.textContent+=key;                 // only adds % after a number
                }
            }
            else if (keysNum.includes(key)) // Only allow number at expression beginning
            {   if (curExpression.textContent=='0') curExpression.textContent=key;
                else curExpression.textContent+=key;
        }
            else if(expression.length>0){
                if (keysOperators.includes(key)){
                    const lastInput=expression.slice(-1).join('').split('').slice(-1).join('');
                    if (!keysOperators.includes(lastInput)){ // Doesnt allow two operators in succession
                        curExpression.textContent+=key;}
                }
                else curExpression.textContent+=key;
            }
        }
}

function calculate(expression){
    if (checkExpression(expression)){
        console.log(oldExpression.textContent);
        for (i=0;i<expression.length;i++){
            if (oldExpression.textContent=='') oldExpression.textContent+=expression[i];
            else{
                if (i>0) oldExpression.textContent+=expression[i];
            }
        }
        oldExpression.textContent=`(${oldExpression.textContent})`;

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
        curExpression.textContent=`${expression}`;
    }

    else{
        // when expression isnt valid
        // Add css to shake the curExpression a bit in red
    }
    

}

function checkExpression(expression){
    const lastInput=expression.slice(-1).join('').split('').slice(-1).join('');
    return keysNum.includes(lastInput)?true:false; // if last input is operator then return false
}

function getResult(num1,operator,num2){
    if (operator=='/') result=num1/num2;
    if (operator=='%') result=(num1*num2)/100;
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