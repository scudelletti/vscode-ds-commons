import * as vscode from 'vscode';

export const runTestFile = () => {
    const terminal = findOrCreateTerminal("ds-output");
    terminal.show();
    terminal.sendText("reset");

    const [file, _] = getFileAndLine();
    const command = generateTestCommand(file);

    terminal.sendText(command);
  };

export const runTestCursor = () => { 
    const terminal = findOrCreateTerminal("ds-output");
    terminal.show();
    terminal.sendText("reset");

    const [file, lineNumber] = getFileAndLine();
    const command = generateTestCommand(`${file}:${lineNumber}`);

    terminal.sendText(command);
  };

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