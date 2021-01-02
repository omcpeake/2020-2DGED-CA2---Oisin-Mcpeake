window.addEventListener("load", loadGame);
//get a handle to the canvas
var cvs = document.getElementById("main_canvas");

//get a handle to the 2D context of the canvas
var ctx = cvs.getContext("2d");

//game variables

function loadGame() {
    //add game primitive
    initializeGame();

    //start update/draw cycle
    window.requestAnimationFrame(animate);
}

function initializeGame() {

}

function animate() {
    update();
    draw();
    window.requestAnimationFrame(animate);
}

function update() {

}
function draw() {
    clearCanvas("rgb(255, 0, 0)");
}

function clearCanvas(color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
    ctx.restore();
}
