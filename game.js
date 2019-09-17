var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images

var shark = new Image();
var bg = new Image();
var fg = new Image();
var fish = new Image();

shark.src = "images/shark.png";
bg.src = "images/underwater6.png";
fg.src = "images/ground3.png";
fish.src = "images/fish.png";

var style = document.createElement('style');
  style.innerHTML = `
  body{
    background-image: url(images/underwater2.png);
    background-color: #04091e;
    background-position: 0% 0%;
    background-repeat: repeat-x;
}

  `;
  document.head.appendChild(style);


// some variables

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/water.mp3";
scor.src = "sounds/eat.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 30;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


// draw images

function draw(){

    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = gap;
        ctx.drawImage(fish,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 1100 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*bg.height)-fg.height
            }); 
        }


        // detect collision
        
        if(bY + shark.height >=  cvs.height - fg.height){
            location.href = "restart.html";
            //location.gameStop();
            
        }
        
        if(pipe[i].x == shark.height ){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(shark,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();























