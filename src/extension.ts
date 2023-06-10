import * as vscode from 'vscode';
import {runTestCursor, runTestFile} from './ds_test';
import {setTerminalFontSize} from './ds_terminal';

export function activate(context: vscode.ExtensionContext) {
  const terminalZoomIn = vscode.commands.registerCommand('ds-commons.terminal.action.zoomIn', () => {
    setTerminalFontSize((n: number) => n + 1);
  });

  const terminalZoomOut = vscode.commands.registerCommand('ds-commons.terminal.action.zoomOut', () => {
    setTerminalFontSize((n: number) => n - 1);
  });

  const dsRunTestFile = vscode.commands.registerCommand('ds-commons.ds.action.runTestFile', runTestFile); 
  const dsRunTestCursor = vscode.commands.registerCommand('ds-commons.ds.action.runTestCursor', runTestCursor); 

  context.subscriptions.push(terminalZoomIn);
  context.subscriptions.push(terminalZoomOut);
  context.subscriptions.push(dsRunTestFile);
  context.subscriptions.push(dsRunTestCursor);
}

export function deactivate() {}
