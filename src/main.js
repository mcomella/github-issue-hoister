function _removeAddedNodes() {
    let addedElements = Array.from(document.getElementsByClassName(ADDON_DIV_CLASS));
    addedElements.forEach((node) => {
        node.parentNode.removeChild(node);
    });
}

function dispatch() {
    // Back-forward navigation can add nodes: create a clean slate.
    _removeAddedNodes();

    let rePre = '^/.+/.+/';
    let rePost = '/[0-9]+';
    let prRegex = new RegExp(`${rePre}pull${rePost}`);
    let issueRegex = new RegExp(`${rePre}issues${rePost}`);

    if (window.location.pathname.match(prRegex)) {
        linkPullRequest();
    } else if (window.location.pathname.match(issueRegex)) {
        linkIssue();
    }
}

// window.location is an object so we convert it to a string to copy it.
function _getLocation() { return "" + window.location; }

var currentLocation = _getLocation();
function dispatchIfLocationUpdate() {
    if (window.location !== currentLocation) {
        currentLocation = _getLocation();
        dispatch();
    }
}

// We watch the DOM to detect when GitHub changes the page through the history API,
// such as when the user is on the issues list and they click an issue.
//
// The proper way to do this would be browser.webNavigation.onHistoryStateUpdated,
// but this isn't available to content scripts.
let containerObserver = new MutationObserver(dispatchIfLocationUpdate);
let ghPageContainer = document.getElementById('js-repo-pjax-container');
containerObserver.observe(ghPageContainer, {childList: "true"});

dispatch();
