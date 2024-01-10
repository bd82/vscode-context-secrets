# vscode-test-secrets

This repo reproduces an issue where VSCode `context.secrets.get` is not persisted between browser refreshes.

## Steps to reproduce

### Build extension VSIX

1. Clone this repo
2. `npm install`
3. 'npm run vscode:package'
   - this will create `test-vscode-secrets-2.0.0.vsix` in the root of the repo.

### Start GitPod on docker

1. `docker run -it --init -p 3000:3000 -v "$(pwd):/home/workspace:cached" gitpod/openvscode-server`

### Install the extension VSIX

1. Open `http://localhost:3000` in your browser.
2. File -> Open Folder -> `pick any folder`
3. drag and drop `test-vscode-secrets-2.0.0.vsix` into the `Exploer` view in GitPod browser window.
4. Right-Click on the uploaded *.vsix file and choose `Install Extension VSIX`.

### Save and Show the secret saved in `vscode.context.secrets`

1. View --> Command Palette --> `>Save Secret`
2. View --> Command Palette --> `>Show Secret`
   - shows a popup with the secret's value ("abcd1234")
3. Refresh the browser window.
4. View --> Command Palette --> `>Show Secret`

Expected behavior: the secret is shown in the popup.
**Actual behavior: the popup shows "NOT FOUND"**
