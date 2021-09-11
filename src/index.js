let isImageGenerationMode = false;
let showGenerateImageButton = true;
const capturer = new CCapture({
    format: "webm"
});

let _frameCount = [0];
let speedOffset = 0.5;  // Change speed

setup=()=>{
    createCanvas(windowWidth, windowHeight);
};

draw=()=>{
    _frameCount[0]++;

    // Start capture
    if (isImageGenerationMode && _frameCount[0] === 1) {
        capturer.start();
    }

    background(`#eee`);
    ellipse(
      width / 2,
      height / 2,
      min(width, height) * map(sin(getRadiansFromFrame()), -1, 1, 0.3, 0.6)
    );

    // End capture
    if (isImageGenerationMode) {
        if (_frameCount[0] < 360 / speedOffset) {
            capturer.capture(canvas);
        } else if (_frameCount[0] === 360 / speedOffset) {
            capturer.save();
            capturer.stop();
            isImageGenerationMode = false;
        }
    }
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