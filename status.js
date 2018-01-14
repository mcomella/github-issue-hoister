// TODO: multiple files?

function dispatch() {
    let rePre = '^/.+/.+/';
    let rePost = '/[0-9]+';
    let prRegex = new RegExp(`${rePre}pull${rePost}`);
    let issueRegex = new RegExp(`${rePre}issues${rePost}`);

    if (window.location.pathname.match(prRegex)) {
        linkPullRequest();
    } else if (window.location.pathname.match(issueRegex)) {
        linkIssue();
    } else {
        // TODO: maybe we should post "none found".
        log('none');
    }
}

function linkPullRequest() {
    let issueLinkNodes = getIssueLinkNodes();
    if (issueLinkNodes.length < 1) {
        return;
    }

    // TODO: css.
    let linkingParentNode = document.createElement('div');
    let titleNode = document.createElement('p');
    titleNode.innerText = 'Created by github add-on:'; // TODO
    linkingParentNode.appendChild(titleNode);

    let unorderedList = document.createElement('ul');
    linkingParentNode.appendChild(unorderedList);
    for (let issueNode of issueLinkNodes) {
        let li = document.createElement('li');
        li.append(issueNode.cloneNode(true));
        unorderedList.appendChild(li);
    }

    let threadNode = document.getElementById('discussion_bucket');
    threadNode.parentNode.insertBefore(linkingParentNode, threadNode);
}

// TODO: dedupe.
// TODO: closes/issue.
// TODO: isn't necessarily the closing/issue link.
/* For PR: extracts the linked/hoverable nodes in commit message lines. */
function getIssueLinkNodes() {
    let commitMsgNodes = document.getElementsByClassName('commit-message');
    let issueLinkNodes = [];
    return Array.from(commitMsgNodes)
        .map((node) => node.getElementsByClassName('issue-link'))
        .filter((arr) => arr.length > 0)
        .reduce((arr, coll) => arr.concat(coll[0]), []); // TODO: assume only 1.
}

// TODO: we can infer:
// - a PR which references this issue (open, close, etc.)
// - Commits which reference this issue
// - ^ Don't necessarily close though.
function linkIssue() {
    log('issue');
}

dispatch();

// Utils.
function log(msg) {
    console.log('lol: ' + msg);
}
