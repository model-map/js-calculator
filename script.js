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


    /*
    Key     |NumBar     |NumPad
    (       57          -
    )       48
    %       53
    7       55          103
    8       

    */