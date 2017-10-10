import createServer, { ServerType } from 'webserv/commands/createServer';
import { ServerResponse } from 'http';
import opn = require('opn');
import welcomePage from '../templates/welcomePage';

function welcomeRoute(request: any, response: ServerResponse) {
	response.write(welcomePage(request));
	response.end();
}

export default function start(): Promise<any> {
	return createServer({
		middleware: [welcomeRoute],
		port: 8888,
		start: true
	}).then((server) => {
		console.log(`server started on ${ server.port }`);
		opn(`http://localhost:${ server.port }`);
	}, () => {
		console.error('server failed to start');
	});
}
