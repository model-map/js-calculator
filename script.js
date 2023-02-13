const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');

// Event Listeners

    // CLICK
    buttons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const dataKey= button.getAttribute('data-key');
            if (dataKey=='CE'){
                screen.textContent=screen.textContent.slice(0,-1);
            }
            else if (screen.textContent.length-10<=40){
                const text=button.textContent;
                screen.textContent+=text;}
        })
    })

    //Keyboard
    window.addEventListener("keydown",(e)=>{
        //console.log(e['key']);
        const key=e['key'];
        const keys=['(', ')', '%', '/', '*', '-', '+', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (keys.includes(key)){
            e.preventDefault();         // prevents quick find associated with / button
            const text=key;
            screen.textContent+=key;
        }
        else if (key=='Backspace'){
            screen.textContent=screen.textContent.slice(0,-1);
        }
        else if (key=='=' || key=='Enter'){
            // Evaluate 
            console.log("I need to add fn to evaluate expression here :| ")
        }
    })