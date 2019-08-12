function saveConversation(name, creatorId) {
    db.collection("conversations").doc().set({
        name: name,
        list_uid: [creatorId],
        messages: []
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

export {saveConversation}