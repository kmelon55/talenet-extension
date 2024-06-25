import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "talenet" is now active!');

  const wordCountStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  wordCountStatusBarItem.command = 'talenet.showWordCount';
  context.subscriptions.push(wordCountStatusBarItem);

  let doubleQuoteDecorator = vscode.window.createTextEditorDecorationType({});
  let singleQuoteDecorator = vscode.window.createTextEditorDecorationType({});

  function updateDecorations() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const doc = editor.document;
    const wordCount = doc.getText().length; // 글자수 계산
    wordCountStatusBarItem.text = `글자수: ${wordCount}`;
    wordCountStatusBarItem.show();

    const text = doc.getText();
    const doubleQuotes = [];
    const singleQuotes = [];
    const doubleQuoteRegex = /"[^"]*"/g;
    const singleQuoteRegex = /'[^']*'/g;

    let match;
    while ((match = doubleQuoteRegex.exec(text))) {
      const startPos = doc.positionAt(match.index);
      const endPos = doc.positionAt(match.index + match[0].length);
      doubleQuotes.push({ range: new vscode.Range(startPos, endPos) });
    }
    while ((match = singleQuoteRegex.exec(text))) {
      const startPos = doc.positionAt(match.index);
      const endPos = doc.positionAt(match.index + match[0].length);
      singleQuotes.push({ range: new vscode.Range(startPos, endPos) });
    }

    const doubleQuoteDecoration = vscode.workspace
      .getConfiguration()
      .get('talenet.doubleQuoteDecoration');
    const singleQuoteDecoration = vscode.workspace
      .getConfiguration()
      .get('talenet.singleQuoteDecoration');
    doubleQuoteDecorator = updateDecorator(
      doubleQuoteDecorator,
      doubleQuoteDecoration
    );
    singleQuoteDecorator = updateDecorator(
      singleQuoteDecorator,
      singleQuoteDecoration
    );

    editor.setDecorations(doubleQuoteDecorator, doubleQuotes);
    editor.setDecorations(singleQuoteDecorator, singleQuotes);
  }

  function updateDecorator(
    decorator: vscode.TextEditorDecorationType,
    decorationOptions: any
  ) {
    decorator.dispose(); // 기존 데코레이터를 삭제
    return vscode.window.createTextEditorDecorationType({
      borderColor: decorationOptions.borderColor,
      color: decorationOptions.color,
      borderStyle: 'solid',
      borderWidth: '1px',
    });
  }

  vscode.window.onDidChangeActiveTextEditor(
    updateDecorations,
    null,
    context.subscriptions
  );
  vscode.workspace.onDidChangeTextDocument(
    updateDecorations,
    null,
    context.subscriptions
  );

  updateDecorations(); // 활성화시 초기 글자수 업데이트
}

export function deactivate() {
  console.log('Your extension "talenet" is now deactivated.');
}
