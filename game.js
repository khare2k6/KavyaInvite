const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
addEventListener('resize',resize);resize();

const overlay=document.getElementById('overlay');
const invite=document.getElementById('invite');
const startBtn=document.getElementById('startBtn');
const again=document.getElementById('playAgain');

const params=new URLSearchParams(location.search);
const guest=params.get('guest');
if(guest) document.getElementById('greeting').textContent=`Hi ${guest}! Help Gauri unlock her invitation!`;

let running=false;
let score=0;
let player={x:80,y:0,vy:0};
let stars=[];

function reset(){
 score=0;
 player.y=canvas.height-120;
 player.vy=0;
 stars=[];
 for(let i=0;i<8;i++) stars.push({x:450+i*180,y:120+Math.random()*(canvas.height-250)});
}
reset();

startBtn.onclick=()=>{
 overlay.classList.add('hidden');
 invite.classList.add('hidden');
 reset();
 running=true;
};

again.onclick=()=>location.reload();

addEventListener('pointerdown',()=>{
 if(running && player.y>=canvas.height-120) player.vy=-14;
});

function tick(){
 requestAnimationFrame(tick);
 ctx.clearRect(0,0,canvas.width,canvas.height);

 ctx.fillStyle='#86d686';
 ctx.fillRect(0,canvas.height-70,canvas.width,70);

 if(running){
   player.vy+=0.8;
   player.y+=player.vy;
   if(player.y>canvas.height-120){player.y=canvas.height-120;player.vy=0;}
   stars.forEach(s=>s.x-=4);
   stars=stars.filter(s=>{
      ctx.font='28px serif';
      if(Math.hypot(s.x-(player.x+15),s.y-(player.y+15))<30){score++;return false;}
      return s.x>-30;
   });
   if(score>=8){running=false;invite.classList.remove('hidden');}
 }

 stars.forEach(s=>{ctx.font='28px serif';ctx.fillText('⭐',s.x,s.y);});
 ctx.beginPath();
 ctx.fillStyle='#ff69b4';
 ctx.arc(player.x+15,player.y+15,15,0,Math.PI*2);
 ctx.fill();

 ctx.fillStyle='#222';
 ctx.font='20px sans-serif';
 ctx.fillText(`⭐ ${score}/8`,20,35);
}
tick();
