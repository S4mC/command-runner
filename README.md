# Command Runner

With this extension, you can run code snippets from markdown and plaintext files with powerful customization options.

<img width="1218" alt="image" src="https://github.com/user-attachments/assets/8f9484fa-723d-4de9-ab7f-513e392f1822" />


## How to Use

- By default the extension is enabled, you can toggle it using the command palette. Trigger the command palette (Ctrl / Cmd + Shift + P) -> Command Runner: Enable / Disable.
- Once it is enabled, above every line that contains the word 'run' followed by a code snippet (e.g. run ````npm -V````) appears a button to execute the command.

### Basic Syntax

**Default terminal:**
````markdown
run `npm install`
````

**Named terminal** (all commands with the same name go to the same terminal):
````markdown
run test`npm test`
run build`npm run build`
run server`node app.js`
````

**Custom display name** (personalize what appears in the CodeLens button):
````markdown
run `npm install`(Install Dependencies)
run `npm test`(Run Tests)
run `npm run dev`(Start Dev Server)
````

Simply write any name before the backticks to create or reuse a named terminal. If no name is provided, commands run in the default "Command Runner" terminal. Add text in parentheses after the command to customize the button display name.

### Examples

````markdown
# Quick commands (default terminal)
run `node --version`
run `npm -v`

# Organized workflows (named terminals)
run dev`npm run dev`
run test`npm test -- --watch`
run build`npm run build`
run lint`npm run lint`

# Custom display names
run `npm install`(Install)
run `npm test`(Test Suite)
run `npm run dev`(Dev Server)
run `npm run build`(Build Project)
run `git status`(Git Status)

# Combining named terminals with custom display
run dev`npm run dev`(Start Development)
run test`npm test -- --watch`(Watch Tests)
````

## Features

- Works in **Markdown** and **Plain Text** files
- Simple syntax: just add a name before backticks
- Named terminals persist - reuse them for related commands
- Supports single (\`command\`), double (\``command``), and triple (\```command```) backticks
- **Custom display names** - personalize button text with parentheses syntax
- Use descriptive names for better visual organization
- ▶︎ symbol always visible for quick identification
- **Visual decorations** - commands are highlighted with a border rectangle for easy identification

## Configuration

### Decoration Settings

Customize the visual appearance of command decorations:

- **`command-runner.enableDecorations`** (default: `true`)  
  Enable or disable the decorative border around commands

- **`command-runner.decorationBorderColor`** (default: `"#4d85b4"`)  
  Border color for command decorations (accepts hex color codes)

- **`command-runner.decorationBackgroundColor`** (default: `"rgba(77, 133, 180, 0.1)"`)  
  Background color for command decorations (accepts rgba or hex color codes)

### Display Settings

- **`command-runner.maxDisplayLength`** (default: `15`)  
  Maximum length for command display in CodeLens before truncation

- **`command-runner.maxCustomNameLength`** (default: `50`)  
  Maximum length for custom display names before truncation

### Example Configuration

Add these settings to your `settings.json`:

```json
{
  "command-runner.enableDecorations": true,
  "command-runner.decorationBorderColor": "#4ec9b0",
  "command-runner.decorationBackgroundColor": "rgba(78, 201, 176, 0.15)",
  "command-runner.maxDisplayLength": 20,
  "command-runner.maxCustomNameLength": 60
}
```