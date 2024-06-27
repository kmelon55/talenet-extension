import * as vscode from 'vscode';

export function updateWordCountStatusBar(
  wordCountStatusBarItem: vscode.StatusBarItem
) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    wordCountStatusBarItem.text = '';
    return;
  }

  const doc = editor.document;
  const includeSpaces = vscode.workspace
    .getConfiguration()
    .get('talenet.includeSpaces');
  let wordCount: number;

  if (includeSpaces) {
    wordCount = doc.getText().length; // 공백 포함 글자수 계산
  } else {
    wordCount = doc.getText().replace(/\s+/g, '').length; // 공백 제외 글자수 계산
  }

  wordCountStatusBarItem.text = `글자 수: ${wordCount}`;
}

export function createWordCountStatusBarItem(): vscode.StatusBarItem {
  const wordCountStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  wordCountStatusBarItem.show();
  return wordCountStatusBarItem;
}
