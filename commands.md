# Commands to Develop and Test the Extension

## Initial Installation
Install dependencies: run `npm install`

## Development

Compile code once: run build`npm run compile`

Compile in watch mode (auto-recompiles on save): run watch`npm run watch`

Run linter: run lint`npm run lint`

Run tests in "test" terminal: run test`npm run test`

## Test the Extension

Press F5 to open the development window
Reload the development window with Ctrl+R after making changes

Run extension tests: run test`npm test`(Run Extension Tests)

## Package Extension to VSIX

Install vsce globally: run package-install`npm install -g @vscode/vsce`

Compile the extension: run compile`npm run compile`

Package to VSIX file: run package`vsce package`

The VSIX file will be created in the root directory and can be installed in VS Code via Extensions → Install from VSIX...