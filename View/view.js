const view = {}

view.setScreen = function(screen) {
    document.getElementById("app").innerHTML = screen.content;
    screen.onload();
}

export default view;