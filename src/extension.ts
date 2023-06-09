import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let setTerminalFontSize = (fun: (n: number) => number) => {
    const config = vscode.workspace.getConfiguration('terminal.integrated');
    const currentFontSize : number = config.get('fontSize') as number;
    const newFontSize : number = fun(currentFontSize);

    vscode.workspace
      .getConfiguration()
      .update('terminal.integrated.fontSize', newFontSize, true);
  };

  let terminalZoomIn = vscode.commands.registerCommand('ds-commons.terminal.action.zoomIn', () => {
    setTerminalFontSize((n) => n + 1);
  });

  let terminalZoomOut = vscode.commands.registerCommand('ds-commons.terminal.action.zoomOut', () => {
    setTerminalFontSize((n) => n - 1);
  });

  context.subscriptions.push(terminalZoomIn);
  context.subscriptions.push(terminalZoomOut);
}

export function deactivate() {}
