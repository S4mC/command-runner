# Change Log

All notable changes to the "command-runner" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

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