import * as assert from 'assert';

suite('Extension Test Suite', () => {
	
	suite('Regex Pattern Tests', () => {
		// Note: regex requires a space before 'run'
		const regex = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;

		test('Should match simple command with single backticks', () => {
			const text = ' run `npm install`';
			const matches = regex.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![3], 'npm install', 'Should capture command');
			assert.strictEqual(matches![1], undefined, 'Should not have terminal name');
			assert.strictEqual(matches![4], undefined, 'Should not have custom name');
		});

		test('Should match command with double backticks', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run ``node --version``';
			const matches = regex2.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![3], 'node --version', 'Should capture command');
		});

		test('Should match command with triple backticks', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run ```echo "test"```';
			const matches = regex2.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![3], 'echo "test"', 'Should capture command');
		});

		test('Should match named terminal command', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run dev`npm run dev`';
			const matches = regex2.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![1], 'dev', 'Should capture terminal name');
			assert.strictEqual(matches![3], 'npm run dev', 'Should capture command');
		});

		test('Should match custom display name', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run `npm install`(Install Dependencies)';
			const matches = regex2.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![3], 'npm install', 'Should capture command');
			assert.strictEqual(matches![4], 'Install Dependencies', 'Should capture custom name');
		});

		test('Should match named terminal with custom display', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run dev`npm run dev`(Start Server)';
			const matches = regex2.exec(text);
			
			assert.ok(matches, 'Should match the pattern');
			assert.strictEqual(matches![1], 'dev', 'Should capture terminal name');
			assert.strictEqual(matches![3], 'npm run dev', 'Should capture command');
			assert.strictEqual(matches![4], 'Start Server', 'Should capture custom name');
		});

		test('Should not match without run keyword', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = '`npm install`';
			const matches = regex2.exec(text);
			
			assert.strictEqual(matches, null, 'Should not match without run keyword');
		});

		test('Should match multiple commands in text', () => {
			const regex2 = / run\s+(?:([\w-]+))?(`{1,3})(.*?)\2(?:\((.*?)\))?/ig;
			const text = ' run `npm install`\n run `npm test`\n run dev`npm run dev`';
			const matches = [];
			let match;
			
			while ((match = regex2.exec(text)) !== null) {
				matches.push(match[3]);
			}
			
			assert.strictEqual(matches.length, 3, 'Should find all three commands');
			assert.strictEqual(matches[0], 'npm install');
			assert.strictEqual(matches[1], 'npm test');
			assert.strictEqual(matches[2], 'npm run dev');
		});
	});

	suite('Input Validation Tests', () => {
		test('Should truncate long custom names', () => {
			const maxLength = 50;
			let customName = 'A'.repeat(60);
			
			if (customName.length > maxLength) {
				customName = customName.substring(0, maxLength - 3) + '...';
			}
			
			assert.strictEqual(customName.length, maxLength, 'Should truncate to max length');
			assert.ok(customName.endsWith('...'), 'Should end with ellipsis');
		});

		test('Should sanitize special characters', () => {
			let customName = '<Test>';
			customName = customName.replace(/[<>]/g, '');
			
			assert.strictEqual(customName, 'Test', 'Should remove angle brackets');
		});

		test('Should handle empty command', () => {
			const command: string = '';
			const isEmpty = !command || command.trim() === '';
			
			assert.strictEqual(isEmpty, true, 'Should detect empty command');
		});

		test('Should handle whitespace-only command', () => {
			const command: string = '   ';
			const isEmpty = !command || command.trim() === '';
			
			assert.strictEqual(isEmpty, true, 'Should detect whitespace-only command');
		});
	});

	suite('Title Generation Tests', () => {
		test('Should generate title with custom name', () => {
			const customName = 'Install Dependencies';
			const title = `▶︎ ${customName}`;
			
			assert.strictEqual(title, '▶︎ Install Dependencies');
			assert.ok(title.startsWith('▶︎'), 'Should start with play symbol');
		});

		test('Should generate default title without custom name', () => {
			const cmd = 'npm install';
			const maxDisplayLength = 15;
			const runText = cmd.length > maxDisplayLength ? `${cmd.substring(0, maxDisplayLength)}...` : cmd;
			const title = `▶︎ Run \`${runText}\` in the terminal`;
			
			assert.ok(title.includes('npm install'), 'Should include command');
			assert.ok(title.includes('▶︎'), 'Should include play symbol');
		});

		test('Should truncate long commands', () => {
			const cmd = 'a'.repeat(50);
			const maxDisplayLength = 15;
			const runText = cmd.length > maxDisplayLength ? `${cmd.substring(0, maxDisplayLength)}...` : cmd;
			
			assert.ok(runText.length <= maxDisplayLength + 3, 'Should truncate long command');
			assert.ok(runText.endsWith('...'), 'Should end with ellipsis');
		});

		test('Should generate title with terminal name', () => {
			const cmd = 'npm test';
			const terminalName = 'test';
			const title = `▶︎ Run \`${cmd}\` in terminal "${terminalName}"`;
			
			assert.ok(title.includes(terminalName), 'Should include terminal name');
		});
	});
});


