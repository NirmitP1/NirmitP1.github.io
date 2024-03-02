var srcType = "vid"; // img represents image, vid represents video
var sourceBtn = document.getElementById("fileSrc");
var source = ""; // a directory

source = sourceBtn.files[0];

var customCharBtn = document.getElementById("customChar");

var color = false;
var fill = false;

const pixelationValue = 10;
var density = "Ñ@#W$9876543210?!abc;:+=-,._      ";

var customChars = false;
var customDen = "Ñ@#W$9876543210?!abc;:+=-,._      ";

customCharBtn.addEventListener("change", function() {
    customCharTextbox = document.getElementById("customCharText");
    
    if (customCharBtn.checked) {
        customChars = true;
        document.getElementById("customCharText").style.display = "block";
        document.getElementById("customCharLabel").style.display = "block";
        customCharTextbox.addEventListener("input", function() {
            customDen = customCharTextbox.value;
            if (customDen == "") {
                customDen = "Ñ@#W$9876543210?!abc;:+=-,._      ";
            }
        });
    }
    else {
        customChars = false;
        document.getElementById("customCharText").style.display = "none";
        document.getElementById("customCharLabel").style.display = "none";
        density = 'Ñ@#W$9876543210?!abc;:+=-,._      ';
    }
});


if (srcType == "img") {
    var canvas = document.createElement("canvas");
    img = new Image();
    img.src = source;

    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    img.onload = function() {
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight;
        ctx.imageSmoothingEnabled = false;
    //    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawImg();
    }

    function drawImg() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ASCII();
        requestAnimationFrame(drawImg);
    }
    
    var line = document.createElement("p");
    document.body.appendChild(line);
    document.querySelector("p").style.textAlign = "center";

    document.body.removeChild(canvas);
}

if (srcType == "vid") {
    var video = document.createElement("video");
    video.src = source;
    video.crossOrigin = "Anonymous";
    video.loop = true;
    video.muted = true;
    video.controls = true;
    video.play();

    document.body.appendChild(video);
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    document.body.querySelector("video").style.display = "none";

    video.oncanplay = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawVid();
    };

    function drawVid() {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        ASCII();
        requestAnimationFrame(drawVid);
    }

    var line = document.createElement("p");
    document.body.appendChild(line);

    document.body.removeChild(canvas);
}   

function mapValue(inputValue, low1, high1, low2, high2) {
    return low2 + (inputValue - low1) * (high2 - low2) / (high1 - low1);
}

function ASCII() {
    pixelArr = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let row = "";

    for(let y = 0; y < canvas.height; y += pixelationValue) {
        for(let x = 0; x < canvas.width; x += pixelationValue) {
            index = (y*canvas.width+x)*4;
            var r = pixelArr.data[index],
                g = pixelArr.data[index+1],
                b = pixelArr.data[index+2];

            if (color == true) {
                document.body.appendChild("div")
                querySelector
            }

            if (customChars == true) {
                density = customDen;
            }

            var avg = (r+g+b)/3;

            ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;

            var charIndex = Math.floor(mapValue(avg, 255, 0, 0, density.length - 1));

            if(density.charAt(charIndex) == " ") {
                row+="&nbsp;";
            }
            else {
                row+=density.charAt(charIndex);
            }
        };
        row+="<br>";
    };

    line.innerHTML = row;
};