import {
  ExtensionContext,
  languages,
  commands,
  Disposable,
  workspace,
  window,
} from "vscode";
import { CodelensProvider } from "./CodelensProvider";
import { Terminal } from "./Terminal";

let disposables: Disposable[] = [];

export function activate(context: ExtensionContext) {
  // Initialize Terminal to set up event listeners
  Terminal.initialize();

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
}

export function deactivate() {
  // Dispose Terminal resources
  Terminal.dispose();
  
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
