import { sendMessage } from '../Models/message.js';
import { authUser } from '../Models/user.js';
import {saveConversation} from '../Models/conversation.js';

function newChatController() {
    const chatController = {};

    chatController.sendMessage = function (msg) {
        sendMessage({
            uid: authUser.id,
            content: msg
        });
        
    }

    chatController.createConversation = function(name) {
        saveConversation(name, authUser.id)
        
    }

    return chatController;
}

export default newChatController;