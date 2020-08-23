// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const caseConversion = (text: string) => {
	const upperCaseExec = /[A-Z]/;
	const lowerCaseExec = /[a-z]/;

	const textArray = text.split('');
	const firstLetter = textArray[0];
	const isToUpperCase = firstLetter.match(lowerCaseExec);
	const isToLowerCase = firstLetter.match(upperCaseExec);
	const isAllLetter = text.match(/^[A-Za-z_]+$/);

	if (!isAllLetter || (!isToLowerCase && !isToUpperCase)) {
		return text;
	}

	const newTextArray: any[] = [];
	textArray.forEach((t, index: number) => {
		const api = isToLowerCase ? 'toLowerCase' : 'toUpperCase';
		const currentTextIsUpperCase = t.match(upperCaseExec);
		// const currentTextIsLowerCase = t.match(lowerCaseExec);
		let newText = [t[api]()];
		console.log(newTextArray, t);
		if (index === 0) {
			newTextArray.push(...newText);
			return;
		}

		const preText = textArray[index - 1];

		if (isToLowerCase && t === '_') {
			return;
		}

		if (isToLowerCase && preText === '_') {
			newTextArray.push(t);
			return;
		}

		if (isToUpperCase && currentTextIsUpperCase) {
			newTextArray.push(...['_', t.toUpperCase()]);
			return;
		}

		newTextArray.push(...newText);
	});
	console.log(newTextArray);
	return newTextArray.join('');
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('demo.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from demo2!');
	});

	// 字符翻转
	let codeReverse = vscode.commands.registerCommand('demo.codeReverse', () => {
		// editor 这个变量并非一定总是有效的值, 当前激活的编辑器
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selections = editor.selections;
			selections.forEach(i => {
				const text = document.getText();
				const newText = text.split('').reverse().join('');
				editor?.edit((editBuilder: vscode.TextEditorEdit) => {
					editBuilder.replace(i, newText);
				});
			});
		}

	});

	// 转换大小写
	let toUpperToLower = vscode.commands.registerCommand('demo.toUpperToLower', () => {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			const text = document.getText();
			console.log(text);
			const newText = caseConversion(text);
			editor?.edit((editBuilder: vscode.TextEditorEdit) => {
				editBuilder.replace(selection, newText);
			});
		}
	});



	context.subscriptions.push(disposable);
	context.subscriptions.push(codeReverse);
	context.subscriptions.push(toUpperToLower);
}

// this method is called when your extension is deactivated
export function deactivate() { }
