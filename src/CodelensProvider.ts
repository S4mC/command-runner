import * as vscode from "vscode";
import { Terminal } from "./Terminal";

export class CodelensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];
  private regex: RegExp;
  private _onDidChangeCodeLenses: vscode.EventEmitter<
    void
  > = new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> = this
    ._onDidChangeCodeLenses.event;

  constructor() {
    // Simplified regex using backreferences
    // Captures: optional terminal name, backticks (1-3), command, optional custom display name in parentheses
    // Examples: run `cmd`, run test`cmd`, run `cmd`(Custom), run test`cmd`(Custom)
    this.regex = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;

    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  // Method to trigger refresh of CodeLenses
  public refresh(): void {
    this._onDidChangeCodeLenses.fire();
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    if (
      vscode.workspace
        .getConfiguration("command-runner")
        .get("enableCodeLens", true)
    ) {
      this.codeLenses = [];
      const regex = new RegExp(this.regex);
      const text = document.getText();
      let matches;
      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        const indexOf = line.text.indexOf(matches[0]);
        const position = new vscode.Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(
          position,
          new RegExp(this.regex)
        );
        if (range) {
          // Extracts the terminal name (if any), the command, and custom display name (if any)
          const terminalName = matches[1] || '';
          const cmd: string = matches[3];
          let customName = matches[4] || ''; // Custom name from parentheses
          
          // Get configuration values
          const maxCustomNameLength = vscode.workspace
            .getConfiguration("command-runner")
            .get("maxCustomNameLength", 50);
          const maxDisplayLength = vscode.workspace
            .getConfiguration("command-runner")
            .get("maxDisplayLength", 15);
          const codeLensIcon = vscode.workspace
            .getConfiguration("command-runner")
            .get("codeLensIcon", "▶︎");
          
          // Validate and truncate custom name if too long
          if (customName && customName.length > maxCustomNameLength) {
            customName = customName.substring(0, maxCustomNameLength - 3) + '...';
          }
          
          // Sanitize custom name to prevent issues with special characters
          if (customName) {
            customName = customName.replace(/[<>]/g, '');
          }
          
          // Get custom icon from configuration
          const icon = vscode.workspace
            .getConfiguration("command-runner")
            .get("codeLensIcon", "▶︎");
          
          let title: string;
          if (customName) {
            // If custom name is provided, use only the icon and the custom name
            title = `${icon} ${customName}`;
          } else {
            // Otherwise, use the default format
            const runText: string = cmd.length > maxDisplayLength ? `${cmd.substring(0, maxDisplayLength)}...` : cmd;
            title = `${icon} Run \`${runText}\``;
            if (terminalName) {
              title += ` in terminal "${terminalName}"`;
            } else {
              title += ' in the terminal';
            }
          }
          
          // Build tooltip with statistics
          let tooltip = `${icon}  Run \`${cmd}\``;
          if (terminalName) {
            tooltip += ` in terminal "${terminalName}"`;
          }
          
          // Add execution statistics to tooltip
          const stats = Terminal.getCommandStats(cmd);
          if (stats) {
            const timeSince = this._getTimeSince(stats.lastExecuted);
            tooltip += `\n\n📊  Statistics:\n  • Executed ${stats.count} time${stats.count !== 1 ? 's' : ''}\n  • Last run: ${timeSince}`;
          }
          
          const command: vscode.Command = {
            title: title,
            tooltip: tooltip,
            command: "command-runner.codelensAction",
            arguments: [cmd, terminalName],
          };
          this.codeLenses.push(new vscode.CodeLens(range, command));
        }
      }
      return this.codeLenses;
    }
    return [];
  }

  private _getTimeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) {return `${seconds} second${seconds !== 1 ? 's' : ''} ago`};
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`};
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {return `${hours} hour${hours !== 1 ? 's' : ''} ago`};
    
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}
