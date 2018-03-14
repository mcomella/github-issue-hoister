let _commitRegex = new RegExp('/[^/]+/[^/]+/commit/[a-zA-Z0-9]+')

function linkIssue() {
    _linkClosedByCommit();
    _linkCommitMsgs();
}

function _linkClosedByCommit() {
    let closedCommitNodes = _getClosedCommitNodes();
    if (closedCommitNodes.length < 1) {
        return;
    }

    let container = getContainerNode();

    let commitTitle = getTitleNode('Commits closing this issue:');
    let commitsList = _createListOfNodes(closedCommitNodes);
    container.appendChild(commitTitle);
    container.appendChild(commitsList);

    insertAboveConversation(container);
}

function _getClosedCommitNodes() {
    let discussionNodes = document.getElementsByClassName('discussion-item-header');

    let discussionLinks = [];
    Array.from(discussionNodes).forEach((discussionNode) => {
        Array.prototype.push.apply(discussionLinks,
            Array.from(discussionNode.getElementsByTagName('a')));
    });

    let commitLinks = discussionLinks.filter((node) => {
        return node.href.match(_commitRegex) !== null
    });

    return commitLinks.map((commitNode) => {
        let newNode = document.createElement('a');
        newNode.href = commitNode.href;
        newNode.innerText = commitNode.innerText;
        return newNode;
    });
}

function _linkCommitMsgs() {
    let commitMsgNodes = _getCommitMsgNodes();
    if (commitMsgNodes.length < 1) {
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

    return Object.keys(msgsToNodes).map((key) => msgsToNodes[key]).reverse();
}

/* Creates a unordered list node with the given DOM nodes as list items. */
function _createListOfNodes(nodes) {
    let ul = getUlNode();
    for (let node of nodes) {
        let li = document.createElement('li');
        li.appendChild(node);
        ul.appendChild(li);
    }
    return ul;
}
