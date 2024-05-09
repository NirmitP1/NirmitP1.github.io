// image values
var pixelationValue = 10;
var fontSize = 12;
var density = "Ñ@#W$9876543210?!abc;:+=-,._      ";

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var line = document.createElement("p");
document.body.appendChild(line);
document.querySelector("p").style.textAlign = "center";

var previousVideo = null;

function draw(source) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    ASCII();
    requestAnimationFrame(function() {
        draw(source);
    });

    document.getElementById("pixelationSlider").addEventListener("change", function() {
        pixelationValue = parseInt(this.value);
        document.getElementById("vp").innerHTML = this.value;
    });

    document.getElementById("fontSlider").addEventListener("change", function() {
        line.style.fontSize = `${this.value}pt`;
        line.style.lineHeight = `${this.value}px`;
        document.getElementById("vf").innerHTML = this.value;
    });
};

function frames(source) {
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
}

function mapValue(inputValue, low1, high1, low2, high2) {
    return low2 + (inputValue - low1) * (high2 - low2) / (high1 - low1);
};

function ASCII() {
    var pixelArr = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let row = "";

    for(let y = 0; y < canvas.height; y+=pixelationValue) {
        for(let x = 0; x < canvas.width; x+=pixelationValue) {
            index = (y*canvas.width+x)*4;
            var r = pixelArr.data[index],
                g = pixelArr.data[index+1],
                b = pixelArr.data[index+2];

            var avg = (r+g+b)/3

            ctx.fillStyle = `rgb(${avg}, ${avg}, ${avg})`;

            var charIndex = Math.floor(mapValue(avg, 255, 0, 0, density.length - 1));

            if(density.charAt(charIndex) == " ") {
                row+="&nbsp;";
            }
            else {
                row+=density.charAt(charIndex);
            };
        };
        row+="<br>";
    };
    line.innerHTML = row;
};

function videoControls(video) {
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 77) {
            toggleVolume();
        }
        if (event.keyCode == 32 && event.target == document.body) {
            event.preventDefault();
            pause();
        }
    });

    function toggleVolume() {
        if (video.muted) {
            video.muted = false;
        }
        else {
            video.muted = true;
        }
    };

    function pause() {
        if (video.paused) {
            video.play();
        }
        else {
            video.pause();
        }
    }
}

var video = document.createElement("video");
document.body.appendChild(video).style.display = "none";

document.getElementById("fileUpload").addEventListener("change", function(event) {
    var file = event.target.files[0];
    var fileType = file.type[0];
    const reader = new FileReader();

    console.log(fileType);

    video.src = "";

    if (fileType == "v") {
        video.src = URL.createObjectURL(file);

        video.crossOrigin = "Anonymous";
        video.muted = true;
        video.loop = true;

        video.addEventListener("loadedmetadata", function() {
            video.play();
            canvas.height = this.videoHeight;
            canvas.width = this.videoWidth;
            videoControls(video);
            draw(video);
        });

        video.load();
    };

    if (fileType == "i") {
        reader.onload = function() {
            var img = new Image();
            img.src = reader.result;

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.imageSmoothingEnabled = false;
                draw(img);
            }
        };
        reader.readAsDataURL(file);
    };
    document.body.removeChild(canvas);
});

document.getElementById("linkSubmit").onclick = function() {
    video.src = "";

    var src = document.getElementById("fileLink").value;
    var img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.imageSmoothingEnabled = false;
        draw(img);
    };

    img.onerror = function() {
        video.src = src;

        video.crossOrigin = "Anonymous";
        video.muted = true;
        video.loop = true;
        video.controlsList = "nofullscreen";

        video.addEventListener("loadedmetadata", function() {
            video.play();
            canvas.height = this.videoHeight;
            canvas.width = this.videoWidth;
            video.controlList = "nofullscreen";
            videoControls(video);
            draw(video);
        });

        video.load();
    };
    document.body.removeChild(canvas);
}
