// From command line: node Exercises/Lesson7_Node/700_NodeCLI.js

const fs = require("fs");
const filename = "hello.txt";
console.log(`About to write to ${filename}`);

fs.writeFile(filename, "Hello from Node", function (err) {
	if (err) throw err;
	console.log(`Wrote to ${filename}`);
});
