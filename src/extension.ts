import * as vscode from 'vscode';
import {
  updateWordCountStatusBar,
  createWordCountStatusBarItem,
} from './wordCounter';
import { updateQuoteDecorations } from './quoteDecorator';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "WordCountAndQuoteColor" is now active!');

  const wordCountStatusBarItem = createWordCountStatusBarItem();
  context.subscriptions.push(wordCountStatusBarItem);

  function updateAll() {
    updateWordCountStatusBar(wordCountStatusBarItem);
    updateQuoteDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor(
    updateAll,
    null,
    context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
    updateAll,
    null,
    context.subscriptions
  );

  updateAll();
}

export function deactivate() {
  console.log('Extension "WordCountAndQuoteColor" is now deactivated.');
}
