let fullscreen = document.getElementById("fullscreen");

fullscreen.addEventListener('click',()=>{
    if (document.fullscreenElement) {
        document.exitFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-enter.png">';
    } else {
        document.documentElement.requestFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-exit.png">';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.exitFullscreen();
        fullscreen.innerHTML = '<img src = "./assets/images/fullscreen-enter.png">';
    }
});