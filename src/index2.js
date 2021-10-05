/**
 * Referenced
 * https://ippsketch.com/posts/making-gifs-with-p5js/
 * @type {number}
 */

const NUM_FRAMES = 100;
const SPEED_OFFSET = 0.5;
let isImageGenerationMode = false;
let showGenerateImageButton = true;
const capturer = new CCapture({
    format: "webm"
});

setup=()=>{
    createCanvas(windowWidth, windowHeight);
};

draw=()=>{
    const normalizedFrame = (SPEED_OFFSET * (frameCount - 1) % NUM_FRAMES) / NUM_FRAMES;

    // Start capture
    if (isImageGenerationMode && frameCount === 1) {
        capturer.start();
    }

    background(`#eee`);

    const radius = min(width, height) * 0.2;
    const r = min(width, height) / 2 - radius / 2;
    ellipse(
      width / 2 + cos(getRadiansFromFrame(normalizedFrame)) * r,
      height / 2 + sin(getRadiansFromFrame(normalizedFrame)) * r,
      radius
    );

    // End capture
    if (isImageGenerationMode) {
        if (frameCount - 1 < NUM_FRAMES / SPEED_OFFSET) {
            capturer.capture(canvas);
        } else if (frameCount - 1 === NUM_FRAMES / SPEED_OFFSET) {
            capturer.save();
            capturer.stop();
            isImageGenerationMode = false;
        }
    }
};

const getRadiansFromFrame = (_normalizedFrame) => {
    return TWO_PI * _normalizedFrame;
};

const generateImageButton = document.getElementById("generateImageButton");
if (showGenerateImageButton) {
    generateImageButton.style.display = `block`;
    generateImageButton.addEventListener("click", () => {
        frameCount = 0;
        isImageGenerationMode = true;
    });
} else {
    generateImageButton.remove();
}