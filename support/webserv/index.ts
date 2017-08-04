import createServer, { ServerType } from 'webserv/commands/createServer';
import opn = require('opn');

createServer({
	directory: './dist',
	port: 8888,
	type: ServerType.HTTPS
}).then((server) => {
	server.start()
		.then(() => {
			console.log(`server started on ${ server.port }`);
			opn(`https://localhost:${ server.port }`);
		}, () => {
			console.error('server failed to start');
		});
});

