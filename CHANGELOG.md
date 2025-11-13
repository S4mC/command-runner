# Change Log

All notable changes to the "command-runner" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.4.0] - 2025-11-13

### Added
- **Visual Decorations:** Commands are now highlighted with a customizable border rectangle
- New setting `command-runner.enableDecorations` to toggle decorations on/off
- New setting `command-runner.decorationBorderColor` to customize border color (default: `#569cd6`)
- New setting `command-runner.decorationBackgroundColor` to customize background color (default: `rgba(86, 156, 214, 0.1)`)
- Decorations update in real-time when editing documents
- Support for custom colors using hex codes or rgba values

### Changed
- Improved visual feedback for command identification in text
- Enhanced user experience with better command visibility

## [0.3.1] - 2025-10-06

### Fixed
- **Terminal Management:** Fixed issue where commands would not execute after closing terminals
- Added automatic terminal validation before command execution
- Terminal references are now properly checked and recreated when closed
- Improved event listener registration to prevent memory leaks
- Terminal dispose method now properly cleans up all resources

## [0.3.0] - 2025-10-05

### Added
- **Custom Display Names:** New syntax to personalize CodeLens button text using parentheses: ```` run `command`(Custom Name) ````
- Support for descriptive names in custom display names for better visual organization
- Custom names work with both default and named terminals
- Button shows only ▶︎ symbol + custom name when specified

### Changed
- Improved regex pattern to capture custom display names
- Enhanced CodeLens title generation logic

### Examples
````markdown
run `npm install`(Install Dependencies)
run dev`npm run dev`(Start Dev Server)
run test`npm test`(Run Tests)
````

## [0.2.0]

### Added
- Support for named terminals
- Extension now activates in any file
- Simplified syntax: any text before backticks becomes the terminal name

### Changed
- Terminal management improved with named terminal map
- CodeLens provider updated to handle terminal names

## [0.1.2]

### Fixed
- Minor bug fixes and improvements

## [0.1.0]

### Added
- Initial release
- Basic command execution from markdown files
- Support for single, double, and triple backticks
- CodeLens integration for visual command execution