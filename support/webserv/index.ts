import createServer, { ServerType } from 'webserv/commands/createServer';
import opn = require('opn');
import WebProxy from 'webserv/middleware/WebProxy';
import route from 'webserv/handlers/route';
import ServeFile from 'webserv/middleware/ServeFile';
import { setLogLevel } from 'webserv/log';
import LogRequest from 'webserv/middleware/LogRequest';
import { ServerResponse } from 'http';

const proxy = new WebProxy('http://localhost:9999', {
	ws: true
});

setLogLevel('debug');

createServer({
	middleware: [
		new LogRequest(),
		route('/assets/*').wrap([
			new ServeFile('./assets')
		]),
		route('/node_modules/*').wrap([
			new ServeFile('./node_modules')
		]),
		new ServeFile('./dist')
	],
	type: ServerType.HTTPS,
	port: 8001
}).then((server) => {
	server.start()
});

createServer({
	middleware: [
		route('/assets/*').wrap([
			new ServeFile('./assets')
		]),
		proxy
	],
	port: 8010,
	type: ServerType.HTTP,
	upgrade: proxy
}).then((server) => {
	server.start()
});

createServer({
	middleware: [(_request: any, response: ServerResponse) => {
		response.write(`
			<html>
			<body>
				<ul>
					<li><a href="http://localhost:8010">Local dev server</a> (proxies to webpack dev server)</li>
					<li><a href="https://localhost:8001">HTTPS server</a> (uses build in dist)</li>
				</ul>
			</body>
			</html>
		`);
		response.end();
	}],
	port: 8888
}).then((server) => {
	return server.start().then(() => {
		console.log(`server started on ${ server.port }`);
		opn(`http://localhost:${ server.port }`);
	});
}, () => {
	console.error('server failed to start');
});
