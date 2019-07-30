function newChatController() {
    const chatController = {};

    chatController.sendMessage = function(msg) {
        console.log(msg);
        
    }

    return chatController;
}

export default newChatController;