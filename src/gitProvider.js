const vscode = require('vscode');
const gitUrlParse = require('git-url-parse');

function gitProvider(remoteUrl) {
    const gitUrl = gitUrlParse(remoteUrl);
    const gitHubDomain = vscode.workspace.getConfiguration('githubOpener').get('gitHubDomain', 'github.com');

    // Check if it's GitHub (github.com or custom GitHub domain)
    if (gitUrl.resource === 'github.com' || gitUrl.resource === gitHubDomain) {
        return {
            webUrl: () => gitUrl.toString('https').replace(/(\.git)$/, '')
        };
    }

    throw new Error('Only GitHub repositories are supported');
}

module.exports = gitProvider;
