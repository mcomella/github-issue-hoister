// TODO: css.
let linkPullRequest = function linkPullRequest() {
    let issueLinkNodes = _getIssueNodes();
    if (issueLinkNodes.length < 1) {
        // TODO: none found?
        return;
    }

    let container = document.createElement('div');

    let titleNode = document.createElement('p');
    titleNode.innerText = 'Commits in this PR address the following issues:';
    container.appendChild(titleNode);

    let issueList = document.createElement('ul');
    for (let [labelNode, numNode] of issueLinkNodes) {
        let li = document.createElement('li');
        if (labelNode) {
            li.append(labelNode.cloneNode(true));
            li.append(' ');
        }
        li.append(numNode.cloneNode(true));
        issueList.appendChild(li);
    }
    container.appendChild(issueList);

    // Insert our changes into the DOM.
    let threadNode = document.getElementById('discussion_bucket');
    threadNode.parentNode.insertBefore(container, threadNode);
}

/*
 * Extracts the nodes associated with an issue. Returns an array of arrays,
 * where each inner array is [issueLabelNode, issueNumberNode]. The number
 * node will never be undefined but the label node could be undefined.
 */
function _getIssueNodes() {
    let commitMsgNodes = document.getElementsByClassName('commit-message');
    let issueNumToNodes = {};
    for (let commitMsgNode of commitMsgNodes) {
        // For now, we assume a commit message will only have one label and num.
        // N.B: 'issue-keyboard' only appears for "closes", not "issue".
        let issueLabelNode = commitMsgNode.getElementsByClassName('issue-keyword')[0];
        let issueNumNode = commitMsgNode.getElementsByClassName('issue-link')[0];

        if (!issueNumNode) continue;

        let issueNum = issueNumNode.innerText;
        if (issueNumToNodes[issueNum] &&
                issueNumToNodes[issueNum].label &&
                _isClosingLabel(issueNumToNodes[issueNum].label.innerText)) {
            // If this commit claims to close an issue, we want to know about it:
            // continue, rather than potentially overwriting with "Issue".
            continue;
        }

        // Put into a map to dedupe based on the issue number.
        issueNumToNodes[issueNum] = {
            label: issueLabelNode,
            num: issueNumNode,
        };
    }

    let labelNumNodeArr = [];
    for (let key of Object.keys(issueNumToNodes)) {
        let val = issueNumToNodes[key];
        labelNumNodeArr.push([val.label, val.num]);
    }
    return labelNumNodeArr;
}

function _isClosingLabel(label) {
    let lcLabel = label.toLowerCase();
    return [
        'closes',
        'fixes'
    ].some((el) => lcLabel === el);
}
