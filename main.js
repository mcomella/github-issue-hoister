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
        log('none');
    }
}

// TODO: css.
function linkPullRequest() {
    let issueLinkNodes = getIssueLinkNodesInPR();
    if (issueLinkNodes.length < 1) {
        // TODO: none found?
        return;
    }

    let container = document.createElement('div');

    let titleNode = document.createElement('p');
    titleNode.innerText = 'Issues addressed in this PR:'; // TODO
    container.appendChild(titleNode);

    let issueList = document.createElement('ul');
    container.appendChild(issueList);
    for (let issueNode of issueLinkNodes) {
        let li = document.createElement('li');
        li.append(issueNode.cloneNode(true));
        issueList.appendChild(li);
    }

    // Insert our changes into the DOM.
    let threadNode = document.getElementById('discussion_bucket');
    threadNode.parentNode.insertBefore(container, threadNode);
}

// TODO: dedupe.
// TODO: closes/issue.
// TODO: isn't necessarily the closing/issue link.
/* For PR: extracts the linked/hoverable nodes in commit message lines. */
function getIssueLinkNodesInPR() {
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

lol();
