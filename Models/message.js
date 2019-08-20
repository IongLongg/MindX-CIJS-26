import {authUser} from './user.js';

let listMessage = []
let currentConversation = ''

const listSubscribers = []

function fetchMessage(conversationId) {
    listMessage = []
    let messageRef = db.collection('messages')
    let query = messageRef.where('conversationId', '==', conversationId)

    query.get().then( function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
            listMessage.push(doc.data())
        });
        notifyMessages(listMessage)
    })
    
}

function changeConversation(conversationId) {
    currentConversation = conversationId
    fetchMessage(conversationId)
}

function saveMessage(content) {
    db.collection("messages").doc().set({
        conversationId: currentConversation,
        userId: authUser.id,
        content: content
    })
    .then(function() {
        console.log("Message is created!");
    })
    .catch(function(error) {
        console.error("Failed to sent ...", error);
    });
}


function subscribe(screen) {
    listSubscribers.push(screen)
}

function notifyMessage(message) {
    for (let i = 0; i < listSubscribers.length; i++) {
        listSubscribers[i].onNotifyMessage(message)
    }
};

function notifyMessages(messages) {
    for (let i = 0; i < listSubscribers.length; i++) {
        listSubscribers[i].onNotifyMessages(messages)
    }
};

export {saveMessage, subscribe, currentConversation, changeConversation}