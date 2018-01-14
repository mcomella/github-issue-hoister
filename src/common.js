function getContainerNode() {
    return document.createElement('div');
}

function getTitleNode(title) {
    let titleNode = document.createElement('p');
    titleNode.innerText = title;
    titleNode.style = 'margin-bottom: 0px;'; // override GH style.
    return titleNode;
}

function getUlNode() {
    let ul = document.createElement('ul');
    ul.style = 'padding-left: 40px; margin-bottom: 14px;';
    return ul;
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
