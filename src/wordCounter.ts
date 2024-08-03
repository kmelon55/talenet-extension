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
  const text = doc.getText();
  const wordCountWithSpaces = text.length; // 공백 포함 글자수 계산
  const wordCountWithoutSpaces = text.replace(/\s+/g, '').length; // 공백 제외 글자수 계산

  wordCountStatusBarItem.text = `글자 수 (공백 포함): ${wordCountWithSpaces}자 / (공백 제외): ${wordCountWithoutSpaces}자`;
}

export function createWordCountStatusBarItem(): vscode.StatusBarItem {
  const wordCountStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  wordCountStatusBarItem.show();
  return wordCountStatusBarItem;
}
