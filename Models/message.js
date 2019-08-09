import guid from '../ultis/uuid.js';

const messages = [];

var db = firebase.firestore();
        db.collection('conversations').onSnapshot(function (snapShot) {
            const conversations = snapShot.docChanges()
            const conversation = conversations[0];
            const messages = conversation.doc.data().messages
            console.log(messages)
            
            if (messages) {
                 receiveMessage(messages[messages.length - 1])
            }
        })

function receiveMessage(message) {
    messages.push(message);
    notifyMessage(message);
    // saveMessage(message);
};

function sendMessage(message) {
    messages.push(message);
    saveMessage(message);
};

const listSubscriber = [];

function subscribe(screen) {
    listSubscriber.push(screen);
};

function unsubscribe(screen) {
    //TODO: homework
};

function notifyMessage(message) {

    for (let i = 0; i < listSubscriber.length; i++) {
        listSubscriber[i].onNotifyMessage(message);
    }
};

function saveMessage(message) {
    message.id = guid();

    db.collection("conversations").doc("GZipxA9eWg2PnoRQD0lm").update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    })
    .then(function () {
            console.log("Document successfully written!");
        })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });
};

export { sendMessage };
export { subscribe };
export { unsubscribe };
export default messages;