let ADDON_DIV_CLASS = 'addon-github-issue-hoister';

function getContainerNode() {
    let container = document.createElement('div');
    container.classList.add(ADDON_DIV_CLASS);
    return container;
}

function getTitleNode(title, appendTutorial) {
    let titleNode = document.createElement('p');
    titleNode.innerText = title;
    titleNode.style = 'margin-bottom: 0px;'; // override GH style.

    if (appendTutorial) {
        let tutorialLink = document.createElement('a');
        tutorialLink.setAttribute('href', 'https://github.com/mcomella/github-issue-hoister/blob/master/docs/tutorial.md');
        tutorialLink.innerText = 'tutorial';

        titleNode.append(' (');
        titleNode.appendChild(tutorialLink);
        titleNode.append(')');
    }

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
    console.log('github-issue-hoister add-on: ' + msg);
}
