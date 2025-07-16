let buttons = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
let operator = document.querySelectorAll(".operator");
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.innerText; 
        console.log(value);
        changevalue(value);
    });
});
const changevalue = (value) =>{
    if(value=="AC"){
     display.innerText="0";
    }else if(value=="DE"){
     display.innerText = display.innerText.slice(0, -1)||"0";
    }else if (display.innerText.length >= 17) {
        return;
    } else if(display.innerText=="0"){
     display.innerText =value;
    }else if (value === "=") {
        try {
            display.innerText = eval(display.innerText);
        } catch (e) {
            display.innerText = "Error";
        }
    }else{
     display.innerText +=`${value}`;
    }
}
