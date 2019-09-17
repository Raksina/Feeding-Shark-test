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
    background-position: 8% 9%;
    background-repeat: repeat-x;
}

  `;
  document.head.appendChild(style);


// some variables

var gap = 85;
var constant;

var sX = 10;
var sY = 150;

var gravity = 1;

var score = 0;

// sound

var swim = new Audio();
var scor = new Audio();

swim.src = "sounds/water.mp3";
scor.src = "sounds/eat.mp3";

// shark move

document.addEventListener("keydown",moveUp);

function moveUp(){
    sY -= 30;
    swim.play();
}

// fish coordinates

var food = [];

food[0] = {
    x : cvs.width,
    y : 0
};


// draw images

function draw(){

    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < food.length; i++){
        
        constant = gap;
        ctx.drawImage(fish,food[i].x,food[i].y+constant);
             
        food[i].x--;
        
        if( food[i].x == 1100 ){
            food.push({
                x : cvs.width,
                y : Math.floor(Math.random()*bg.height)-fg.height
            }); 
        }


        // detect collision
        
        if(sY + shark.height >=  cvs.height - fg.height){
            location.href = "restart.html";
            //location.gameStop();
            
        }
        
        if(food[i].x == shark.height ){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(shark,sX,sY);
    
    sY += gravity;
    
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();























