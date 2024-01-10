const vscode = require("vscode");

/**
 * Entry Point for a VSCode Extension.
 *
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const outputChannel = vscode.window.createOutputChannel("test-vscode-secrets");
  const saveSecretSubscription = vscode.commands.registerCommand(
    "extension.saveSecret",
    async function registerCallback() {
      const secretKey = "foobar123";
      outputChannel.appendLine(`Saving secret: ${secretKey}`);
      context.secrets.store(secretKey, "abcd1234");
    }
  );
  context.subscriptions.push(saveSecretSubscription);


    const showSecretSubscription = vscode.commands.registerCommand(
        "extension.showSecret",
        async function registerCallback() {
            const secretKey = "foobar123";
            const secretValue = await context.secrets.get(secretKey) || "NOT FOUND"
            outputChannel.appendLine(`Read secret value: ${secretValue}`);
            vscode.window.showInformationMessage(secretValue);
        }
    );
    context.subscriptions.push(showSecretSubscription);
}

/**
 * this method is called when your extension is deactivated
 */
function deactivate() {
    // do nothing
}

module.exports = {
  activate,
  deactivate
};
