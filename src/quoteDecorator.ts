import * as vscode from 'vscode';

let doubleQuoteDecorator = vscode.window.createTextEditorDecorationType({});
let singleQuoteDecorator = vscode.window.createTextEditorDecorationType({});

export function updateQuoteDecorations() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const doubleQuotes = [];
  const singleQuotes = [];
  const doubleQuoteRegex = /"[^"]*"/g;
  const singleQuoteRegex = /'[^']*'/g;

  let match;
  while ((match = doubleQuoteRegex.exec(text))) {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    doubleQuotes.push({ range: new vscode.Range(startPos, endPos) });
  }
  while ((match = singleQuoteRegex.exec(text))) {
    const startPos = editor.document.positionAt(match.index);
    const endPos = editor.document.positionAt(match.index + match[0].length);
    singleQuotes.push({ range: new vscode.Range(startPos, endPos) });
  }

  const doubleQuoteColor = vscode.workspace
    .getConfiguration()
    .get('talenet.doubleQuoteColor');
  const singleQuoteColor = vscode.workspace
    .getConfiguration()
    .get('talenet.singleQuoteColor');

  doubleQuoteDecorator = updateDecorator(doubleQuoteDecorator, {
    color: doubleQuoteColor,
  });
  singleQuoteDecorator = updateDecorator(singleQuoteDecorator, {
    color: singleQuoteColor,
  });

  editor.setDecorations(doubleQuoteDecorator, doubleQuotes);
  editor.setDecorations(singleQuoteDecorator, singleQuotes);
}

function updateDecorator(
  decorator: vscode.TextEditorDecorationType,
  decorationOptions: any
): vscode.TextEditorDecorationType {
  decorator.dispose();
  return vscode.window.createTextEditorDecorationType(decorationOptions);
}
