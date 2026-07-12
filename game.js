/* ==========================================================
   Kavya's Piano Recital
   Version 1 - Part 1
========================================================== */

const landing = document.getElementById("landing");
const pianoScreen = document.getElementById("pianoScreen");
const inviteScreen = document.getElementById("inviteScreen");

const startBtn = document.getElementById("startBtn");
const status = document.getElementById("status");

const keys = [...document.querySelectorAll(".key")];

const melody = [0,0,1,0,3,2];

let player=[];
let accepting=false;

const AudioContextClass =
window.AudioContext ||
window.webkitAudioContext;

const audio =
new AudioContextClass();

const notes=[
261.63,
293.66,
349.23,
392.00,
440.00
];

function sleep(ms){

    return new Promise(r=>setTimeout(r,ms));

}

function playTone(note){

    const osc=audio.createOscillator();
    const gain=audio.createGain();

    osc.type="triangle";

    osc.frequency.value=notes[note];

    osc.connect(gain);

    gain.connect(audio.destination);

    gain.gain.setValueAtTime(.25,audio.currentTime);

    gain.gain.exponentialRampToValueAtTime(

        0.0001,

        audio.currentTime+.45

    );

    osc.start();

    osc.stop(audio.currentTime+.45);

}

async function flash(index){

    playTone(index);

    keys[index].classList.add("active");

    await sleep(350);

    keys[index].classList.remove("active");

    await sleep(120);

}

async function playMelody(){

    accepting=false;

    status.innerHTML="🎵 Listen Carefully";

    await sleep(800);

    for(const note of melody){

        await flash(note);

    }

    status.innerHTML="🎹 Your Turn";

    player=[];

    accepting=true;

}

startBtn.onclick=async()=>{

    if(audio.state==="suspended")
        await audio.resume();

    landing.classList.add("hidden");

    pianoScreen.classList.remove("hidden");

    playMelody();

};

/* ==========================================================
   Version 1 - Part 2
========================================================== */

async function wrongKey(){

    accepting=false;

    status.innerHTML="❌ Oops! Try Again";

    await sleep(1000);

    playMelody();

}

async function success(){

    accepting=false;

    status.innerHTML="🎉 Perfect!";

    await sleep(1200);

    pianoScreen.classList.add("hidden");

    inviteScreen.classList.remove("hidden");

}

keys.forEach((key,index)=>{

    key.addEventListener("click",async()=>{

        if(!accepting) return;

        await flash(index);

        player.push(index);

        const current=player.length-1;

        if(player[current]!==melody[current]){

            wrongKey();

            return;

        }

        if(player.length===melody.length){

            success();

        }

    });

});
/* ==========================================================
   Version 1 - Part 3
========================================================== */

const mapBtn = document.getElementById("mapBtn");
const rsvpBtn = document.getElementById("rsvpBtn");

if(mapBtn){

    mapBtn.addEventListener("click",()=>{

        // TODO: Replace with your Google Maps link
        window.open(
            "https://maps.google.com",
            "_blank"
        );

    });

}

if(rsvpBtn){

    rsvpBtn.addEventListener("click",()=>{

        // TODO: Replace with your WhatsApp number
        window.open(
            "https://wa.me/919902041200",
            "_blank"
        );

    });

}


/* ---------- Simple celebration ---------- */

function burst(){

    for(let i=0;i<25;i++){

        const s=document.createElement("div");

        s.style.position="fixed";
        s.style.left=(50+Math.random()*30-15)+"vw";
        s.style.top=(40+Math.random()*20-10)+"vh";

        s.style.width="10px";
        s.style.height="10px";

        s.style.borderRadius="50%";

        s.style.background=[
            "#ff4d6d",
            "#ffd93d",
            "#6bcBef",
            "#8bc34a",
            "#d16bff"
        ][Math.floor(Math.random()*5)];

        s.style.pointerEvents="none";

        s.style.transition="all 1.8s ease-out";

        document.body.appendChild(s);

        requestAnimationFrame(()=>{

            s.style.transform=
            `translate(${Math.random()*500-250}px,
                        ${Math.random()*500-250}px)
             scale(.2)`;

            s.style.opacity="0";

        });

        setTimeout(()=>{

            s.remove();

        },1800);

    }

}


/* replace success() */

success = async()=>{

    accepting=false;

    status.innerHTML="🎉 Excellent!";

    burst();

    await sleep(1400);

    pianoScreen.classList.add("hidden");

    inviteScreen.classList.remove("hidden");

}
/* ==========================================================
   Floating Balloons
========================================================== */

const balloonLayer = document.createElement("div");
balloonLayer.id = "balloonLayer";
document.body.appendChild(balloonLayer);

const balloonIcons = [
    "🎈",
    "🎈",
    "🎈",
    "🎈",
    "🎈"
];

function spawnBalloon(){

    const b = document.createElement("div");

    b.className = "balloon";

    b.textContent =
        balloonIcons[Math.floor(Math.random()*balloonIcons.length)];

    const fromLeft = Math.random() < 0.5;

    if(fromLeft){

        b.style.left =
            (20 + Math.random()*120) + "px";

    }else{

        b.style.right =
            (20 + Math.random()*120) + "px";

    }

    b.style.fontSize =
        (40 + Math.random()*35) + "px";

    b.style.animationDuration =
        (8 + Math.random()*6) + "s";

    b.style.setProperty(
        "--drift",
        (Math.random()*180-90)+"px"
    );

    balloonLayer.appendChild(b);

    setTimeout(()=>{

        b.remove();

    },15000);

}

setInterval(spawnBalloon,900);

for(let i=0;i<8;i++){

    setTimeout(spawnBalloon,i*500);

}