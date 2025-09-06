// VS Code extension to open GitHub repository in browser
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const open = require('open');
const findParentDir = require('find-parent-dir');
const ini = require('ini');
const gitProvider = require('./gitProvider');

function openInGitHub() {
    // Get workspace folder path
    const workspacePath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

    if (!workspacePath) {
        vscode.window.showErrorMessage('No workspace folder found');
        return;
    }

    // Find git repository
    const repoDir = findParentDir.sync(workspacePath, '.git');
    if (!repoDir) {
        vscode.window.showErrorMessage('Cannot locate .git repository for this workspace');
        return;
    }

    // Get git config and find remote URL
    const configPath = path.join(repoDir, '.git', 'config');

    fs.readFile(configPath, 'utf-8', (err, data) => {
        if (err) {
            vscode.window.showErrorMessage(`Cannot read git config: ${err.message}`);
            return;
        }

        const config = ini.parse(data);
        let remoteUrl = null;

        // Look for origin remote first, then any remote
        if (config['remote "origin"']?.url) {
            remoteUrl = config['remote "origin"'].url;
        } else {
            const remotes = Object.keys(config).filter(k => k.startsWith('remote '));
            if (remotes.length > 0) {
                remoteUrl = config[remotes[0]].url;
            }
        }

        if (!remoteUrl) {
            vscode.window.showWarningMessage('No remote repository found');
            return;
        }

        try {
            const provider = gitProvider(remoteUrl);
            open(provider.webUrl());
        } catch (e) {
            vscode.window.showWarningMessage(`Error: ${e.message}`);
        }
    });
}

function activate(context) {
    const disposable = vscode.commands.registerCommand('extension.openInGitHub', openInGitHub);
    context.subscriptions.push(disposable);
}

module.exports = { activate };
