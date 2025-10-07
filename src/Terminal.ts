import * as vscode from "vscode";

export class Terminal {
  static defaultTermName: string = "Command Runner";
  static defaultTerm: vscode.Terminal | undefined;
  static namedTerminals: Map<string, vscode.Terminal> = new Map();
  static closeTerminalListenerDisposable: vscode.Disposable | undefined;

  static initialize() {
    // Register the close terminal listener only once
    if (!Terminal.closeTerminalListenerDisposable) {
      Terminal.closeTerminalListenerDisposable = vscode.window.onDidCloseTerminal((event) => {
        if (event.name === Terminal.defaultTermName) {
          Terminal.defaultTerm = undefined;
        } else {
          // Remove from named terminals map
          for (const [name, term] of Terminal.namedTerminals.entries()) {
            if (term === event) {
              Terminal.namedTerminals.delete(name);
              break;
            }
          }
        }
      });
    }
  }

  static _isTerminalValid(terminal: vscode.Terminal | undefined): boolean {
    if (!terminal) {
      return false;
    }
    // Check if the terminal still exists in the active terminals
    return vscode.window.terminals.includes(terminal);
  }

  static _getDefaultTerm(): vscode.Terminal {
    try {
      // Check if the existing terminal is still valid
      if (Terminal.defaultTerm && !Terminal._isTerminalValid(Terminal.defaultTerm)) {
        Terminal.defaultTerm = undefined;
      }

      if (!Terminal.defaultTerm) {
        Terminal.defaultTerm = vscode.window.createTerminal(Terminal.defaultTermName);
      }
      // Always show the terminal, even if it already existed
      Terminal.defaultTerm.show(true);
      return Terminal.defaultTerm;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Command Runner: Failed to create default terminal - ${errorMessage}`);
      throw error;
    }
  }

  static _getNamedTerm(name: string): vscode.Terminal {
    try {
      let term = Terminal.namedTerminals.get(name);
      
      // Check if the existing terminal is still valid
      if (term && !Terminal._isTerminalValid(term)) {
        Terminal.namedTerminals.delete(name);
        term = undefined;
      }

      if (!term) {
        term = vscode.window.createTerminal(`Command Runner: ${name}`);
        Terminal.namedTerminals.set(name, term);
      }
      term.show(true);
      return term;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Command Runner: Failed to create terminal "${name}" - ${errorMessage}`);
      throw error;
    }
  }

  static run(command: string, terminalName: string = '') {
    try {
      if (!command || command.trim() === '') {
        vscode.window.showWarningMessage('Command Runner: Cannot execute an empty command');
        return;
      }

      let term: vscode.Terminal;

      if (terminalName) {
        term = Terminal._getNamedTerm(terminalName);
      } else {
        term = Terminal._getDefaultTerm();
      }

      term.sendText(command, true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      vscode.window.showErrorMessage(`Command Runner: Failed to execute command - ${errorMessage}`);
      console.error('Command Runner error:', error);
    }
  }

  static dispose() {
    if (Terminal.closeTerminalListenerDisposable) {
      Terminal.closeTerminalListenerDisposable.dispose();
      Terminal.closeTerminalListenerDisposable = undefined;
    }
    if (Terminal.defaultTerm) {
      Terminal.defaultTerm.dispose();
      Terminal.defaultTerm = undefined;
    }
    for (const term of Terminal.namedTerminals.values()) {
      term.dispose();
    }
    Terminal.namedTerminals.clear();
  }
}
