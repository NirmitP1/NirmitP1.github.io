const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d");

var x = 0;
var y = 0;

var mouseX = 0;
var mouseY = 0;

var angle = 0;

cellSize = 50;

ctx.fillStyle = "white";
ctx.strokeStyle = "white";

document.addEventListener("mousemove", function(event)
    {
        mouseX = event.clientX - ctx.canvas.offsetLeft;
        mouseY = event.clientY - ctx.canvas.offsetTop;
        console.log(mouseX, mouseY);
    });

function drawWave(frequency, length)
{
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    for(i = 0; i < canvas.width; i++) 
    {
        ctx.lineTo(i, canvas.height / 2 + Math.sin(i*frequency+angle*0.1)*length)
    }
    ctx.stroke();
    ctx.closePath();
}

function drawRect(x, y, width, length)
{
    ctx.beginPath();
    ctx.fillRect(x, y, width, length);
    ctx.closePath();
}

function animate()
{
    angle+=0.1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(910, 100);

    requestAnimationFrame(animate);
}

animate()