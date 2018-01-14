// TODO: we can infer:
// - (DONE) Commits which reference this issue
// - a PR which references this issue (open, close, etc.)
// - Closed with commit...
function linkIssue() {
    let commitMsgNodes = _getCommitMsgNodes();
    if (commitMsgNodes.length < 1) {
        // TODO: none found?
        return;
    }

    let container = getContainerNode();

    let commitTitle = getTitleNode('Commits referencing this issue:');
    let commitsList = _createListOfNodes(commitMsgNodes);
    container.appendChild(commitTitle);
    container.appendChild(commitsList);

    insertAboveConversation(container);
}

/*
 * Extracts the commit messages, and links to the messages, associated with an issue.
 */
function _getCommitMsgNodes() {
    let commitMsgNodes = document.getElementsByClassName('commit-message');
    let newNonDedupedNodes = Array.from(commitMsgNodes).map((el) => {
        let msgNodes = el.getElementsByClassName('message');
        let linkedNodes = el.getElementsByTagName('a');
        if (msgNodes.length < 1 || linkedNodes.length < 1) { return null; }

        let newNode = document.createElement('a');
        newNode.href = msgNodes[0].href; // All href on these nodes are the same.
        newNode.innerText = Array.from(linkedNodes).map((el) => el.innerText).join(' ');
        return newNode;
    }).filter((el) => el);

    // Dedupe: we want the latest commits, which are more likely to link
    // to a PR when you click them, so we overwrite existing msgs.
    let msgsToNodes = {};
    newNonDedupedNodes.forEach((node) => {
        msgsToNodes[node.innerText] = node;
    });

    return Object.keys(msgsToNodes).map((key) => msgsToNodes[key]);
}

/* Creates a unordered list node with the given DOM nodes as list items. */
function _createListOfNodes(nodes) {
    let ul = document.createElement('ul');
    for (let node of nodes) {
        let li = document.createElement('li');
        li.appendChild(node);
        ul.appendChild(li);
    }
    return ul;
}
