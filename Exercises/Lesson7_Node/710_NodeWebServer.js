// From command line: node Exercises/Lesson7_Node/710_NodeWebServer.js
// then browse to http://localhost:8080/

const http = require("http");
const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/html" });
	res.write('<div class="slds-text-heading_large">Hello Student!</div>');
	res.end(`Your User agent is ${req.headers["user-agent"]}`);
});
server.listen(8080, "127.0.0.1");
