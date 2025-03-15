let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let started=false;
let level=0,count=0,Hgscore=0;
let h2=document.querySelector("h2");
let audio=document.getElementById('backgroundmusic');
let over=document.getElementById("gameover");
let countdown=document.querySelector(".circle");
alert("**Game Introduction**\nTest your memory and reflexes in this fun and colorful Simon Says-inspired game! The game presents a sequence of flashing colors, and your task is to replicate the pattern by clicking the buttons in the correct order. As you progress, the sequence gets longer, challenging your memory and focus.\n\nGet ready! Memorize the sequence and repeat it correctly. How long can you go? Good luck!");
document.addEventListener("keypress",async function(){
    if(started==false)
    {
       h2.innerHTML="Make sure to play better.";
      countdown.classList.remove("over");
         await timer();
        audio.play();
        console.log("game started");
        started=true;
        levelUp();
    }
});
if (window.innerWidth <= 480) {
  const circle = document.querySelector('.circle');
  circle.addEventListener("dblclick", async function () {
    if (started == false) {
      h2.innerHTML = "Make sure to play better.";
      countdown.classList.remove("over");
      await timer();
      audio.play();
      console.log("Game started via double-click on cirlce");
      started = true;
      levelUp();
    }
  });
}

function Gameflash(btn)
{
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
}
function userFlash(btn)
{
  btn.classList.add("userFlash");
  setTimeout(function(){
    btn.classList.remove("userFlash");
  },250);
  countdown.classList.add("circle2");
  setTimeout(function(){
    countdown.classList.remove("circle2");
  },250);
}

function levelUp()
{
    level++;
    userSeq=[];
    let countdown=document.getElementById("countdown");

    countdown.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    console.log(randColor);
    gameSeq.push(randColor);
    let randbtn=document.querySelector(`.${randColor}`); 
    Gameflash(randbtn);
}
function checkAns(idx)
{
  console.log("answer checked");
  if(userSeq[idx]==gameSeq[idx])
  { 
    count++;
    if(userSeq.length==gameSeq.length)
     {
        setTimeout(levelUp,1000);
     }
  }
  else
  {
      if(count>Hgscore)
        Hgscore=count;
      audio.pause();
      countdown.classList.add("over");
    // h2.innerHTML=`Game over Hightest Score is ${Hgscore},  your score was ${count} press any key to Restart `;
    h2.innerHTML = `Game over. 
  <span style="color: green; font-weight: bold;">Highest Score: ${Hgscore}</span>, 
  <span style="color: red; font-weight: bold;">Your Score: ${count}</span>. 
  Press any key to Restart.`;

    over.play();
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor="white";
    },150); 
    resite();
  }
}

function btnPress()
{
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
let allButns=document.querySelectorAll(".btn");
for(btn of allButns)
{
        btn.addEventListener("click",btnPress);
}
function resite()
{
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;
  count=0;
}


function timer() {
  return new Promise((resolve) => {
    let countdownNumber = 3; // Start from 3
    const countdownElement = document.getElementById('countdown');

    const timer = setInterval(() => {
      // Add the scaling class
      countdownElement.classList.add('scale');

      // Wait for the transition to complete, then update the number
      setTimeout(() => {
        countdownNumber--;
        countdownElement.textContent = countdownNumber;
        countdownElement.classList.remove('scale'); // Remove scaling for the next number

        if (countdownNumber === 0) {
          clearInterval(timer); // Stop the countdown at 0
          resolve(); // Resolve the promise when the timer finishes
        }
      }, 300); // Match the transition duration
    }, 1000);
  });
}
