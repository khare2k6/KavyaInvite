/* ==========================================================
   Kavya's Birthday
   Part 1
========================================================== */

const landing=document.getElementById("landing");
const pianoScreen=document.getElementById("pianoScreen");
const inviteScreen=document.getElementById("inviteScreen");

const startBtn=document.getElementById("startBtn");
const status=document.getElementById("status");

const keys=[...document.querySelectorAll(".key")];

const melody=[0,0,1,0,3,2]

let player=[];
let accepting=false;

/* -----------------------------
   WAV Piano Sounds
------------------------------ */

const sounds=[
"C4",
"D4",
"E4",
"F4",
"G4",
"A4"
].map(name=>{

    const a=new Audio(`assets/audio/${name}.mp3`);

    a.preload="auto";

    return a;

});

function playTone(note){

    const s=sounds[note].cloneNode();

    s.volume=.95;

    s.play().catch(()=>{});

}

function sleep(ms){

    return new Promise(r=>setTimeout(r,ms));

}

async function flash(index){

    playTone(index);

    keys[index].classList.add("active");

    await sleep(320);

    keys[index].classList.remove("active");

    await sleep(120);

}

async function playMelody(){

    accepting=false;

    status.innerHTML="🎵 Listen Carefully";

    await sleep(700);

    for(const note of melody){

        await flash(note);

    }

    status.innerHTML="🎹 Repeat the Melody";

    player=[];

    accepting=true;

}

startBtn.onclick=async()=>{

    landing.classList.add("hidden");

    pianoScreen.classList.remove("hidden");

    playMelody();

};

/* ==========================================================
   Part 2
========================================================== */

async function wrongKey(){

    accepting=false;

    status.innerHTML="❌ Try Again";

    await sleep(1000);

    playMelody();

}

async function success(){

    accepting=false;

    status.innerHTML="🎉 Excellent!";

    burst();

    await sleep(1400);

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
   Part 3 - Maps / RSVP
========================================================== */

const mapBtn=document.getElementById("mapBtn");
const rsvpBtn=document.getElementById("rsvpBtn");

if(mapBtn){

    mapBtn.addEventListener("click",()=>{

        window.open(
            "https://maps.google.com/?q=Funky+Island+Pacific+Mall+Jasola",
            "_blank"
        );

    });

}

if(rsvpBtn){

    rsvpBtn.addEventListener("click",()=>{

        window.open(
            "https://wa.me/919902041200",
            "_blank"
        );

    });

}


/* ==========================================================
   Celebration Confetti
========================================================== */

function burst(){

    for(let i=0;i<30;i++){

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
        s.style.zIndex="999";

        s.style.transition="all 1.8s ease-out";

        document.body.appendChild(s);

        requestAnimationFrame(()=>{

            s.style.transform=
            `translate(${Math.random()*600-300}px,
                        ${Math.random()*600-300}px)
             scale(.2)
             rotate(${Math.random()*720}deg)`;

            s.style.opacity="0";

        });

        setTimeout(()=>{

            s.remove();

        },1800);

    }

}


/* ==========================================================
   Floating Balloons
========================================================== */

const balloonLayer=document.createElement("div");
balloonLayer.id="balloonLayer";
document.body.appendChild(balloonLayer);

/* Change these to PNGs later if you want */
const balloons=[
"🎈",
"🎈",
"🎈",
"🎈",
"🎈"
];

function spawnBalloon(){

    const b=document.createElement("div");

    b.className="balloon";

    b.textContent=
        balloons[Math.floor(Math.random()*balloons.length)];

    if(Math.random()<0.5){

        b.style.left=(20+Math.random()*120)+"px";

    }else{

        b.style.right=(20+Math.random()*120)+"px";

    }

    b.style.fontSize=
        (40+Math.random()*35)+"px";

    b.style.animationDuration=
        (8+Math.random()*6)+"s";

    b.style.setProperty(
        "--drift",
        (Math.random()*220-110)+"px"
    );

    balloonLayer.appendChild(b);

    setTimeout(()=>{

        b.remove();

    },15000);

}

setInterval(spawnBalloon,900);

for(let i=0;i<8;i++){

    setTimeout(spawnBalloon,i*450);

}