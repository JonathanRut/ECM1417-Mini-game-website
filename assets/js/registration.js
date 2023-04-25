// This changes the skin color of the preview image depending on what had been selected
function skinChange(color){
    document.getElementById("current-skin").src = "./assets/images/skin/" + color + ".png";
}

// This changes the mouth of the preview image depending on what had been selected
function mouthChange(mouth){
    document.getElementById("current-mouth").src = "./assets/images/mouth/" + mouth + ".png";
}

// This changes the eyes of the preview image depending on what had been selected
function eyeChange(eye){
    document.getElementById("current-eyes").src = "./assets/images/eyes/" + eye + ".png";
}