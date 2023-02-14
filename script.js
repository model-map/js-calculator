const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');
let expression=null;

const keys=['(', ')', '%', '/', '*', '-', '+', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysNum=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keysOperators=['/', '*', '-', '+'];

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

    if (checkExpression(expression)){
        expression=expression.split(/(\d+)/);
        expression=expression.slice(1,-1);

    
        while(expression.length>1){
            keysOperators.forEach((operator)=>{
                if (expression.includes(operator)){
                    const index= expression.indexOf(operator);
                    const num1= parseInt(expression[index-1]);
                    const num2=parseInt(expression[index+1]);
                    const result= getResult(num1,operator,num2);
                    expression.splice(index-1,3,result);
                }
            })
        }

/*         while (expression.length>1){
            if (expression.includes('/')){ 
                getDivision(expression);
                continue;}
            if (expression.includes('*')) {
                getMultiplication(expression);
                continue;}
            if (expression.includes('+')) {
                getAddition(expression);
                continue;}
            if (expression.includes('-')) {
                getSubtraction(expression);
                continue;}
        } */

        screen.textContent=`${expression[0]}`;

    }

    else{
        // when expression isnt valid
    }
    

}

function checkExpression(expression){
    return keysNum.includes(expression.slice(-1))?true:false;
}

function getResult(num1,operator,num2){
    if (operator=='/') result=num1/num2;
    if (operator=="*") result=num1*num2;
    if (operator=='+') result=num1+num2;
    if (operator=='-') result=num1-num2;
    return result;
}

/* function getDivision(expression){
    const index= expression.indexOf('/');
    const num1= parseInt(expression[index-1]);
    const num2=parseInt(expression[index+1]);
    const result=num1/num2;
    expression.splice(index-1,3,result);
    return expression;
}

function getMultiplication(expression){
    const index= expression.indexOf('*');
    const num1= parseInt(expression[index-1]);
    const num2=parseInt(expression[index+1]);
    const result=num1*num2;
    expression.splice(index-1,3,result);
    return expression;
}

function getAddition(expression){
    const index= expression.indexOf('+');
    const num1= parseInt(expression[index-1]);
    const num2=parseInt(expression[index+1]);
    const result=num1+num2;
    expression.splice(index-1,3,result);
    return expression;
}

function getSubtraction(expression){
    const index= expression.indexOf('-');
    const num1= parseInt(expression[index-1]);
    const num2=parseInt(expression[index+1]);
    const result=num1-num2;
    expression.splice(index-1,3,result);
    return expression;
}
 */