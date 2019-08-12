import login from "./View/auth/login.js";
import view from "./View/view.js"
import register from "./View/auth/register.js"
import chat from "./View/chat/index.js"

window.onload = function() {
    view.setScreen(chat);
}
