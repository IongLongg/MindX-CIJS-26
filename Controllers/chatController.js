import { saveMessage, changeConversation } from '../Models/message.js';
import { authUser } from '../Models/user.js';
import {saveConversation} from '../Models/conversation.js';

function newChatController() {
    const chatController = {};

    chatController.sendMessage = function (msg) {
       saveMessage(msg)
    }

    chatController.createConversation = function(name) {
        saveConversation(name, authUser.id)
    }

    chatController.changeConversation = function(conversationId) {
        changeConversation(conversationId)
    }

    return chatController;
}

export default newChatController;