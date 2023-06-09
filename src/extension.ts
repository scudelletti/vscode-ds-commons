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

  let dsRunTestFile = vscode.commands.registerCommand('ds-commons.ds.action.runTestFile', () => {
    const terminal = findOrCreateTerminal("ds-output");
    terminal.show();
    terminal.sendText("reset");

    const [file, _] = getFileAndLine();
    const command = generateTestCommand(file);

    terminal.sendText(command);
  });

  let dsRunTestCursor = vscode.commands.registerCommand('ds-commons.ds.action.runTestCursor', () => {
    const terminal = findOrCreateTerminal("ds-output");
    terminal.show();
    terminal.sendText("reset");

    const [file, lineNumber] = getFileAndLine();
    const command = generateTestCommand(`${file}:${lineNumber}`);

    terminal.sendText(command);
  });

  let generateTestCommand = (file : string) => {
    const prefix = 'MIX_ENV=test iex -S mix do test';
    const suffix = '--trace , run -e "System.halt"';

    return `${prefix} ${file} ${suffix}`;
  };

  let getFileAndLine = () =>{
    const editor = vscode.window.activeTextEditor;

    const fileName = editor!.document.fileName;
    const lineNumber = editor!.selection.active.line + 1;

    return [fileName as string, lineNumber.toString()];
  };

  let findOrCreateTerminal = (terminalName : string) => {
    let terminal = vscode.window.terminals.find(terminal => terminal.name === terminalName);

    if (!terminal) {
      terminal = vscode.window.createTerminal("ds-output");
    }

    return terminal;
  };

  context.subscriptions.push(terminalZoomIn);
  context.subscriptions.push(terminalZoomOut);
  context.subscriptions.push(dsRunTestFile);
  context.subscriptions.push(dsRunTestCursor);
}

export function deactivate() {}
