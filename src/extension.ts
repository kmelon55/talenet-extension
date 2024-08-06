import * as vscode from 'vscode';
import {
  updateWordCountStatusBar,
  createWordCountStatusBarItem,
} from './wordCounter';
import { updateQuoteDecorations } from './quoteDecorator';
import { showWebView } from './webView';
import { WebviewButtonProvider } from './buttonProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "WordCountAndQuoteColor" is now active!');

  // Register command to show WebView
  const showWebViewCommand = vscode.commands.registerCommand(
    'extension.showWebView',
    () => {
      showWebView(context);
    }
  );

  context.subscriptions.push(showWebViewCommand);

  // Register a view for the button
  const webviewButtonProvider = new WebviewButtonProvider();
  vscode.window.registerTreeDataProvider(
    'webviewButton',
    webviewButtonProvider
  );
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
