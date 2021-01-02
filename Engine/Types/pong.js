//get a handle to the canvas
var cvs = document.getElementById("main_canvas");

//get a handle to the 2D context of the canvas
var ctx = cvs.getContext("2d");

window.addEventListener("load", loadGame);

var pongBall, pongPaddleL, pongPaddleR;
var ballSpeed = 5;
var hitColorA = "yellow", hitColorB = "green";
var hitColor = hitColorA;

function loadGame(){
    //add game primitive
    initializeGame();
    //start update/draw cycle
    window.requestAnimationFrame(animate);
}

function initializeGame(){
    pongBall = new Arc(320, 240, 20, 0, Math.PI * 2);
    ballVector = new Vector2(
            Math.floor(Math.random() * 10 - 5),
            Math.floor(Math.random() * 10 - 5));
    ballVector.normalize();
 //   ballVector.round();
}

function animate(){

    checkCollisions();

    update();
    draw();  
    window.requestAnimationFrame(animate);
}

function checkCollisions(){
    if(this.pongBall.x >= cvs.clientWidth - 20){
        this.ballVector.x *= -1;
        hitColor = hitColorA;
    }
    else if(this.pongBall.x <= 20){
        this.ballVector.x *= -1;
        hitColor = hitColorB;
    }

    if(this.pongBall.y >= cvs.clientHeight - 20)
        this.ballVector.y *= -1;
    else if(this.pongBall.y <= 20)
        this.ballVector.y *= -1;
}



function update(){
    //first time in, set the ball in a random direction
    //Math.random();
    //Math.floor();

    this.pongBall.x += ballSpeed * ballVector.x;
    this.pongBall.y += ballSpeed * ballVector.y;
}
function draw(){
    clearCanvas("rgb(255, 255, 241)");
    pongBall.draw(ctx, 2, "red", hitColor, false);
}

function clearCanvas(color){
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
    ctx.restore();
}

//-10, 10, 0
function getRandomInRangeExcl(lo, hi, excl){

}