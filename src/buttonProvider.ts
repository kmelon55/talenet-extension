import * as vscode from 'vscode';

export class WebviewButtonProvider
  implements vscode.TreeDataProvider<WebviewButtonItem>
{
  getTreeItem(element: WebviewButtonItem): vscode.TreeItem {
    return element;
  }

  getChildren(): WebviewButtonItem[] {
    return [
      new WebviewButtonItem(
        'Open WebView',
        vscode.TreeItemCollapsibleState.None,
        {
          command: 'extension.showWebView',
          title: 'Open WebView',
        }
      ),
    ];
  }
}

class WebviewButtonItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    if (command) {
      this.command = command;
    }
  }

  contextValue = 'webviewButtonItem';
}
