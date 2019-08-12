const view = {}

view.setScreen = function(screen, id = "app") {
    document.getElementById(id).innerHTML = screen.content;
    screen.onload();
}

export default view;