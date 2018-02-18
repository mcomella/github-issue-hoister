# GitHub Issue Hoister
[Available on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/github-issue-hoister/)

### Problem
When viewing a GitHub issue, it's time-consuming to find any pull
requests that address the issue: you need to scroll through many issue comments
to find GitHub's autolinks, such as...
- "Author added a commit... that referenced this issue"
- "Author referenced this issue"
- "Author closed this in..."

Once you find the autolinks, you have to click through to find the referencing
pull request and hope they're not out-of-date.

### This solution
This add-on addresses this problem by making the autolinks easier to access –
they're hoisted to the top of the issue thread – and curating them for least
likely to be outdated.

This solution was chosen for speed of implementation but is not ideal:
- You still need to click through links to find the most recent pull request
- It requires an add-on so it's not available to all users.

### Alternatives
I only looked briefly but I saw no other existing alternatives.

A more complex but comprehensive solution would be to listen for the pull
request webhook and respond by writing the connecting issue <-> pr information
directly into the issues. A few trade-offs:
- Requires a server
- It needs to be explicitly added to individual repositories

This work [is currently in progress][kotbot].

## Development
For an example on how to develop WebExtensions with Firefox, see [here][webex].

To build, run the script:
```sh
./build.sh
```

which will write the file to `out/bundle.xpi`.

Here are some issues to use while testing:
- [Issue: Simple "Issue" and "Closes"](https://github.com/mozilla-mobile/firefox-tv/issues/293)
- [Issue: contains duplicate commits](https://github.com/mozilla-mobile/firefox-tv/issues/295)
- [PR: addresses two issues](https://github.com/mcomella/Spoon-Knife/pull/7)

## License
The license included with this repository is based on the X11 license, which is
similar to the MIT license.

[kotbot]: https://github.com/mcomella/moz_mobile_github_helper
[webex]: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Your_first_WebExtension
