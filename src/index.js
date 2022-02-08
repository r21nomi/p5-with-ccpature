let isImageGenerationMode = false;
let showGenerateImageButton = true;
const capturer = new CCapture({
    format: "webm"
});

let _frameCount = [0];
let speedOffset = 10;  // Change speed

let theShader, _pixelDensity;
const vertexShader = require('webpack-glsl-loader!./shader/vertexShader.vert');
const fragmentShader = require('webpack-glsl-loader!./shader/fragmentShader.frag');

setup=()=>{
    const w = 6262;
    const h = 862;
    createCanvas(w, h, WEBGL);
    theShader = createShader(vertexShader, fragmentShader);
    _pixelDensity = pixelDensity();
};

draw=()=>{
    _frameCount[0]++;

    // Start capture
    if (isImageGenerationMode && _frameCount[0] === 1) {
        capturer.start();
    }

    if (theShader) {
        theShader.setUniform("resolution", [width * _pixelDensity, height * _pixelDensity]);
        theShader.setUniform("time", getTime());
        shader(theShader);
        const offsetX = 1;
        const offsetY = 1;

        quad(-offsetX, -offsetY, offsetX, -offsetY, offsetX, offsetY, -offsetX, offsetY);
    } else {
        background(`#eee`);
        ellipse(
            width / 2,
            height / 2,
            min(width, height) * map(sin(getRadiansFromFrame()), -1, 1, 0.3, 0.6)
        );
    }

    // End capture
    if (isImageGenerationMode) {
        if (_frameCount[0] < 360 / speedOffset) {
            capturer.capture(canvas);
            console.log(_frameCount[0]);
        } else if (_frameCount[0] === 360 / speedOffset) {
            capturer.save();
            capturer.stop();
            isImageGenerationMode = false;
        }
    }
};

const getTime = () => {
    return millis() / 1000;
};

const getRadiansFromFrame = () => {
    return radians(_frameCount[0] * speedOffset);
};

const generateImageButton = document.getElementById("generateImageButton");
if (showGenerateImageButton) {
    generateImageButton.style.display = `block`;
    generateImageButton.addEventListener("click", () => {
        _frameCount[0] = 0;
        isImageGenerationMode = true;
    });
} else {
    generateImageButton.remove();
}