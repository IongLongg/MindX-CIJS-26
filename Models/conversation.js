import { authUser } from "./user.js";

const listConversation = []
const conversationList = []

const listSubscribers = []

db.collection("conversations").onSnapshot(function (snapShot) {
    const conversations = snapShot.docChanges();
    for (let i = 0; i < conversations.length; i++) {
        const id = conversations[i].doc.id;
        const conversation = conversations[i].doc.data();
        const existedConversation = conversationList.find(function (item) {
        return item.id === id;      
        });
        if (existedConversation === undefined) {
        conversation.id = id;
        conversationList.push(conversation)
        notifyConversation(conversation)
        }
    }
});


function saveConversation(name, creatorId) {
    db.collection("conversations").doc().set({
        name: name,
        list_uid: [authUser.id]
    })
    .then(function() {
        console.log("Conversation is created!");
    })
    .catch(function(error) {
        console.error("Failed to created ...", error);
    });
}


function subscribe(screen) {
    listSubscribers.push(screen)
}

function notifyConversation(conversation) {
    for (let i = 0; i < listSubscribers.length; i++) {
        listSubscribers[i].onNotifyConversation(conversation)
    }
};

export {saveConversation, subscribe}