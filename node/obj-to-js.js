const { program } = require('commander');
const fs = require('fs');

program.option('-i, --input <input>', 'input file').option('-o, --output <output>', 'output file');
program.parse(process.argv);

console.log(program.input);
console.log(program.output);

fs.readFile('./node/assets/' + program.input + '.obj', function read(err, data) {
	if (err) {
		throw err;
	}
	const content = data;

	const text = getText(content.toString(), program.input);
	// const lines = text.split('\n');
	// console.log(lines);

	fs.writeFile('./node/assets/' + program.output + '.js', text, function (err) {
		console.log(err);
	});
});

function getText(text, input) {
	return `const  ${input} = \`${text}\`;`;
}
