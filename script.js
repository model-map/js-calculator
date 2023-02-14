const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');
let expression=null;

const keys=['(', ')', '%', '/', '*', '-', '+', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','=','Enter','Backspace'];
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
                if (expression.length==0 && keysNum.includes(dataKey)) // Only allow number at expression beginning
                {screen.textContent+=dataKey;
            }
                else if(expression.length>0){
                    if (keysOperators.includes(dataKey)){
                        if (!keysOperators.includes(expression.slice(-1))){ // Doesnt allow two operators in succession
                            screen.textContent+=dataKey;}
                    }
                    else screen.textContent+=dataKey;
                }
            }
        })
    })

    //Keyboard
    window.addEventListener("keydown",(e)=>{
        expression=screen.textContent.trim(); // remove whitespace
        const key=e['key'];
        if (keys.includes(key)){
            e.preventDefault();
            if (key=='=' || key=='Enter') calculate(expression);
            else if (key=='Backspace') screen.textContent=screen.textContent.slice(0,-1);
            else if (checkLength(expression)){
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
            }}
    })

// Functions


function checkLength (expression){
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