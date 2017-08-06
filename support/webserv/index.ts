import createServer, { ServerType } from 'webserv/commands/createServer';
import opn = require('opn');
import WebProxy from 'webserv/middleware/WebProxy';
import route from 'webserv/handlers/route';
import ServeFile from 'webserv/middleware/ServeFile';
import { setLogLevel } from 'webserv/log';
import LogRequest from 'webserv/middleware/LogRequest';

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
	port: 8889
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
	port: 8888,
	type: ServerType.HTTP,
	upgrade: proxy
}).then((server) => {
	server.start()
		.then(() => {
			console.log(`server started on ${ server.port }`);
			opn(`https://localhost:${ server.port }`);
		}, () => {
			console.error('server failed to start');
		});
});

