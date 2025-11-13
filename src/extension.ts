import {
  ExtensionContext,
  languages,
  commands,
  Disposable,
  workspace,
  window,
  TextEditorDecorationType,
  Range,
  TextEditor,
} from "vscode";
import { CodelensProvider } from "./CodelensProvider";
import { Terminal } from "./Terminal";

let disposables: Disposable[] = [];
let commandDecorationType: TextEditorDecorationType;

// Function to create decoration style based on configuration
function createDecorationType(): TextEditorDecorationType {
  const config = workspace.getConfiguration("command-runner");
  const borderColor = config.get("decorationBorderColor", "#4d85b4");
  const backgroundColor = config.get("decorationBackgroundColor", "rgba(77, 133, 180, 0.1)");
  
  return window.createTextEditorDecorationType({
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: borderColor,
    backgroundColor: backgroundColor,
    borderRadius: '3px',
    isWholeLine: false,
  });
}

// Function to update decorations in the active editor
function updateDecorations(editor: TextEditor | undefined) {
  if (!editor) {
    return;
  }

  const config = workspace.getConfiguration("command-runner");
  const enableDecorations = config.get("enableDecorations", true);
  
  if (!enableDecorations) {
    editor.setDecorations(commandDecorationType, []);
    return;
  }

  const document = editor.document;
  const regex = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
  const decorations: Range[] = [];
  const text = document.getText();
  let matches;

  while ((matches = regex.exec(text)) !== null) {
    const startPos = document.positionAt(matches.index);
    const endPos = document.positionAt(matches.index + matches[0].length);
    const range = new Range(startPos.translate(0, 1), endPos);
    decorations.push(range);
  }

  editor.setDecorations(commandDecorationType, decorations);
}

export function activate(context: ExtensionContext) {
  // Initialize Terminal to set up event listeners
  Terminal.initialize();

  // Create decoration type
  commandDecorationType = createDecorationType();

  const codelensProvider = new CodelensProvider();

  languages.registerCodeLensProvider({ language: "markdown" }, codelensProvider);
  languages.registerCodeLensProvider({ language: "plaintext" }, codelensProvider);

  commands.registerCommand("command-runner.enableCodeLens", () => {
    workspace
      .getConfiguration("command-runner")
      .update("enableCodeLens", true, true);
  });

  commands.registerCommand("command-runner.disableCodeLens", () => {
    workspace
      .getConfiguration("command-runner")
      .update("enableCodeLens", false, true);
  });

  commands.registerCommand("command-runner.codelensAction", (command: string, terminalName?: string) => {
    Terminal.run(command, terminalName);
  });

  // Update decorations when active editor changes
  window.onDidChangeActiveTextEditor(editor => {
    updateDecorations(editor);
  }, null, context.subscriptions);

  // Update decorations when document changes
  workspace.onDidChangeTextDocument(event => {
    if (window.activeTextEditor && event.document === window.activeTextEditor.document) {
      updateDecorations(window.activeTextEditor);
    }
  }, null, context.subscriptions);

  // Update decorations when configuration changes
  workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration("command-runner")) {
      // Recreate decoration type with new colors
      commandDecorationType.dispose();
      commandDecorationType = createDecorationType();
      updateDecorations(window.activeTextEditor);
    }
  }, null, context.subscriptions);

  // Initial decoration update
  updateDecorations(window.activeTextEditor);
}

export function deactivate() {
  // Dispose decoration type
  if (commandDecorationType) {
    commandDecorationType.dispose();
  }
  
  // Dispose Terminal resources
  Terminal.dispose();
  
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
