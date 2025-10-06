## Basic Syntax

### Simple Command (Default Terminal)
```markdown
run `npm install`
run ``node --version``
run ```echo "Hello World"```
```

**Result:** Executes the command in the default terminal "Command Runner"

## Named Terminals

### Syntax: run `name`\`command\`

Executes the command in a **specific terminal** identified by the name you write before the backticks:res

## Overview

Command Runner allows you to execute terminal commands directly from **Markdown** and **Plain Text** files in VS Code by simply writing the `run` pattern followed by the command in backticks.

**Main Features:**
- Execute commands in default or named terminals
- **Customize button display text** with parentheses syntax
- Automatic terminal creation and management
- Support for descriptive names
- Works in **Markdown** and **Plain Text** files

## Basic Syntax

### Simple Command (Default Terminal)
````markdown
run `npm install`
run ``node --version``
run ```echo "Hello World"```
````

**Result:** Executes the command in the default terminal "Command Runner"

### Custom Display Name (NEW!)

**Syntax:** ````run `command`(Custom Display Name)````

Personalizes what appears in the CodeLens button. Only shows ▶︎ symbol + your custom text.

#### Examples:
````markdown
run `npm install`(Install Dependencies)
run `npm test`(Run Tests)
run `npm run build`(Build Project)
run `git status`(Check Status)
run `docker compose up`(Start Containers)
````

**Display:** Instead of "▶︎ Run `npm install` in the terminal", you'll see "▶︎ Install Dependencies"

## Named Terminals

### Syntax: ````run name`command`````

Executes the command in a **specific terminal** identified by the name you write before the backticks:

````markdown
run dev`npm run dev`
run test`npm test`
run build`npm run build`
````

**Features:**
- If the terminal with that name doesn't exist, it creates it automatically
- All commands with the same name execute in the same terminal
- Ideal for organizing different types of tasks

### Combining Named Terminals + Custom Display

You can use both features together:

````markdown
run dev`npm run dev`(Start Dev Server)
run test`npm test -- --watch`(Watch Tests)
run build`npm run build`(Build Production)
````

This way you have:
- **Organization:** Commands in specific terminals (`dev`, `test`, `build`)
- **Clarity:** Descriptive and visually appealing buttons

## Supported Backtick Types

The extension accepts three types of backticks:

- **Single:** `````  → ````run `command````` or ````run test`command`````
- **Double:** ``````` → ````run ``command`````` or ````run test``command``````
- **Triple:** `````````  → ````run ```command``````` or ````run build```command```````

All three types work with custom display names:
````markdown
run `command`(Name)
run ``command``(Name)
run ```command```(Name)
run terminal`command`(Name)
run terminal``command``(Name)
run terminal```command```(Name)
````

## Practical Examples

### Normal Development with Custom Names
````markdown
Install dependencies: run `npm install`(Install)
Check Node version: run `node --version`(Node Version)
List files: run `dir`(List Files)
Clear console: run `cls`(Clear)
````

### Organized Tasks in Separate Terminals with Custom Display
````markdown
Development server: run server`npm run dev`(Dev Server)
Build in watch mode: run build`npm run watch`(Watch Build)
Run tests: run test`npm test`(Test Suite)
Linter: run lint`npm run lint`(Lint Code)
````

### Full-Stack Project with Visual Organization
````markdown
Backend: run backend`cd backend && npm start`(Backend API)
Frontend: run frontend`cd frontend && npm run dev`(Frontend Dev)
Database: run database`docker compose up`(Database)
Tests: run test`npm test -- --watch`(Watch Tests)
````

## Advantages

**Simple Syntax:** Just write the name before the backticks, add custom display in parentheses
**Organization:** Separate different types of tasks in terminals with descriptive names
**Reusability:** Named terminals persist - all commands with the same name go to the same terminal
**Customization:** Personalize button text with descriptive names
**Flexibility:** No name = default terminal, custom display optional
**File Support:** Works in Markdown (.md) and Plain Text (.txt) files

## Tips

1. **Use descriptive custom names** for better visual organization and quick identification
3. **Named terminals** for grouping related commands: `test`, `build`, `server`, `dev`
4. **Custom display** for long commands that would be truncated
5. **No custom name** when the default format is clear enough
6. Terminal names can contain letters, numbers, and hyphens: `my-server`, `test2`, `build-prod`

