import * as vscode from 'vscode';

export function showWebView(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'webview', // Identifies the type of the webview. Used internally
    'WebView', // Title of the panel displayed to the user
    vscode.ViewColumn.One, // Editor column to show the new webview panel in.
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [
        vscode.Uri.joinPath(context.extensionUri, 'resources'),
        // vscode.Uri.file(context.extensionPath),
      ],
      enableForms: true, // 추가 옵션을 설정합니다.
    }
  );

  // Set the HTML content of the WebView
  panel.webview.html = getWebviewContent();
}

function getWebviewContent() {
  // const yourWebsiteURL = 'https://talenet.kr';
  const yourWebsiteURL = 'http://localhost:3000/vsc';
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WebView</title>
      <style>
        body, html {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${yourWebsiteURL}"></iframe>
    </body>
    </html>
  `;
}
