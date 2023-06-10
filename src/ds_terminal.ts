import * as vscode from 'vscode';

export const setTerminalFontSize = (fun: (n: number) => number) => {
  const config = vscode.workspace.getConfiguration('terminal.integrated');
  const currentFontSize : number = config.get('fontSize') as number;
  const newFontSize : number = fun(currentFontSize);

  vscode.workspace
    .getConfiguration()
    .update('terminal.integrated.fontSize', newFontSize, true);
};