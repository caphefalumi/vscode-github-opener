# VS Code GitHub Opener

> Extension for Visual Studio Code which can be used to quickly open the GitHub repository in your browser

[![GitHub](https://img.shields.io/github/license/caphefalumi/vscode-github-opener)](https://github.com/caphefalumi/vscode-github-opener/blob/master/LICENSE)

## Installation

You can install this extension from the VS Code Marketplace:

1. Open VS Code
2. Press `Ctrl+Shift+X` to open the Extensions view
3. Search for "Github Opener"
4. Click Install

Or install from command line:
```bash
code --install-extension caphefalumi.vscode-github-opener
```

## Usage

### Command

Press `F1` and type `Open in GitHub`.

### Keyboard Shortcut

Press `Ctrl+Alt+G` to open the current repository in GitHub.

### Context Menu

Right click on any file in the Explorer and choose `Open in GitHub`.

## Development

To build and package the extension:

```bash
# Install dependencies
bun install

# Build for development
bun run esbuild

# Build for production
bun run vscode:prepublish

# Package extension
bun run package
```

## License

MIT © [caphefalumi](https://github.com/caphefalumi)
