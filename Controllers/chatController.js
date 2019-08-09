import { sendMessage } from '../Models/message.js';
import { authUser } from '../Models/user.js';

function newChatController() {
    const chatController = {};

    chatController.sendMessage = function (msg) {
        sendMessage({
            uid: authUser.id,
            content: msg
        });
        
    }

    return chatController;
}

export default newChatController;