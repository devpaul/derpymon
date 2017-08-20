import createServer, { ServerType } from 'webserv/commands/createServer';
import WebProxy from 'webserv/middleware/WebProxy';
import route from 'webserv/handlers/route';
import ServeFile from 'webserv/middleware/ServeFile';
import { setLogLevel } from 'webserv/log';
import LogRequest from 'webserv/middleware/LogRequest';
import startWelcomeServer from './welcomeServer';

const proxy = new WebProxy('http://localhost:9999', {
	ws: true
});

setLogLevel('debug');
startWelcomeServer();

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
