let usercount =0;
let compcount=0;

const choices = document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const user_score=document.querySelector(".user_score");
const comp_score=document.querySelector(".comp_score");

const gencompchoice=()=>{
    const option =["rock","paper","scissors"];
    const idx=Math.floor(Math.random()*3);
    return option[idx];
}

const drawgame=()=>{
    console.log("game draw");
    msg.innerText="Game was draw.play again"
    msg.style.backgroundColor="darkblue";
}

const showwinner=(userwin,userchoice,compchoice)=>{
    if(userwin){
          console.log("you win");
          ++usercount;
        msg.innerText=`You win! your ${userchoice} beats ${compchoice}`;
        msg.style.backgroundColor="green";
        user_score.innerText=`${usercount}`;
    }
    else{
        console.log("you lose");
        ++compcount;
        msg.innerText=`You lose.${compchoice} beats your ${userchoice}`;
        msg.style.backgroundColor="red";
        comp_score.innerText=`${compcount}`
    }
}

const playgame=(userchoice)=>{
    console.log("user choice:",userchoice);
    const compchoice=gencompchoice();
    console.log("computer choice:",compchoice);
    if(userchoice===compchoice){
        drawgame();
    }else{
        let userwin =true;
        if(userchoice==="rock"){
            userwin=compchoice==="paper"?false:true;
        }else if(userchoice==="scissors"){
            userwin=compchoice==="rock"?false:true;
        }else{
            userwin=compchoice==="scissors"?false:true;
        }
        showwinner(userwin,userchoice,compchoice);
    }

}

choices.forEach((choice)=> {
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id");
        playgame(userchoice);
    });
});

