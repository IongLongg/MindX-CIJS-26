import messages from "../../Models/message.js"
import {authUser} from "../../Models/user.js"
import newChatController from "../../Controllers/chatController.js"

const chatScreen = `
<div class="h-100">
    <div class="d-flex flex-column h-100">
        <div class="header bg-primary text-white"><h1>Name</h1></div>
        <div class="flex-grow-1" id="js-chatArea"></div>
        <div class="p-3">
            <form id="js-formChat">                             
                <div class="d-flex flex-row w-100">
                    <div class="flex-grow-1">
                        <input type="text" class="form-control" id="chatMsg" placeholder="Type your message ..." >
                    </div>
                    <div>
                        <button type="submit" class="btn btn-outline-primary" >Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
`;

function addMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.setAttribute('class', 'mt-4 mb-4');
    if (message.uid === authUser.id) {
        msgDiv.classList.add('text-right');
    }
    for (let i = 0; i< message.messages.length; i++) {
        msgDiv.appendChild(
            addSingleMessage(message.messages[i], message.uid === authUser.id)
        );
    }
    document.getElementById('js-chatArea').appendChild(msgDiv);
}

function addSingleMessage(content, isOwn) {
    const msgDiv = document.createElement('div')
    msgDiv.setAttribute('class', 'mt-1 mb-1');
    const msgSpan = document.createElement('span');
    if (isOwn) {
        msgSpan.setAttribute('class', 'badge badge-primary');
    } else {
        msgSpan.setAttribute('class', 'badge badge-dark');      
    }
    msgSpan.innerHTML = content;
    msgDiv.appendChild(msgSpan);
    return msgDiv;
}

function onload() {
    for (let i = 0; i< messages.length; i++) {
        addMessage(messages[i])
    }

    const formChat = document.getElementById('js-formChat');
    formChat.addEventListener('submit', function() {
        event.preventDefault();
        const message = formChat.chatMsg.value;
        const controller = newChatController();
        controller.sendMessage(message);
        sadfasdf
    })
}

const chat = {
    content: chatScreen,
    onload: onload
};

export default chat;