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

dispatch();
