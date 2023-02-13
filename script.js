const buttons=document.querySelectorAll(`[data-key]`);
const screen=document.querySelector('.screen');

// Event Listeners

    // CLICK
    buttons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const dataKey= button.getAttribute('data-key');
            if (dataKey=='CE') screen.textContent='';
            else {
                const text=button.textContent;
                screen.textContent+=text;}
        })
    })

    //Keyboard
    window.addEventListener("keypress",(e)=>{
        e.preventDefault();         // prevents quick find associated with / button
        //console.log(e['key']);
        const key=e['key'];
        const keys=['(', ')', '%', '/', '*', '-', '+', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (keys.includes(key)){
            const text=key;
            screen.textContent+=key;
        }
        else if (key=='=' || key=='Enter'){
            // Evaluate 
            console.log("I need to add fn to evaluate expression here :| ")
        }
    })

    /*
    Key     |NumBar     |NumPad
    (       57          -
    )       48
    %       53
    7       55          103
    8       

    */