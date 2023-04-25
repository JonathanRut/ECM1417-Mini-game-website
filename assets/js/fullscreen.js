// The full screen element is retrieved
let fullscreen = document.getElementById("fullscreen");

// A listener is added if the full screen button is pressed
fullscreen.addEventListener('click',()=>{
    // If pressed a check is made to see if the document is already in full screen
    if (document.fullscreenElement) {
        // If it full screen is exited and icon is changed
        document.exitFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-enter.png">';
    } else {
        // If not then the document is put in full screen and icon is changed
        document.documentElement.requestFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-exit.png">';
    }
});

// A listener is added if the escape key is pressed
document.addEventListener('keydown', function(event) {
    // If the escape key is pressed then the full screen is exited and the icon is changed
    if (event.key === 'Escape') {
        document.exitFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-enter.png">';
    }
});