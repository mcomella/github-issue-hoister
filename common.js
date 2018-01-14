function getContainerNode() {
    return document.createElement('div');
}

function getTitleNode(title) {
    let titleNode = document.createElement('p');
    titleNode.innerText = title;
    return titleNode;
}

/*
 * Inserts a node into the DOM above the github conversation.
 * @param title The title of the node
 * @param addContentsFn: a fn given the inserted Node, on which children should be inserted.
 */
function insertAboveConversation(node) {
    let threadNode = document.getElementById('discussion_bucket');
    threadNode.parentNode.insertBefore(node, threadNode);
}

function log(msg) {
    console.log('lol: ' + msg);
}
