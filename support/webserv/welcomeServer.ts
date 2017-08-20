import createServer, { ServerType } from 'webserv/commands/createServer';
import { ServerResponse } from 'http';
import * as ip from 'ip';
import opn = require('opn');

function welcomeRoute(_request: any, response: ServerResponse) {
	const html =
`
<html>
<body>
	<ul>
		<li><a href="http://localhost:8010">Local dev server</a> (proxies to webpack dev server)</li>
		<li><a href="https://localhost:8001">HTTPS server</a> (uses build in dist)</li>
	</ul>
	<div>
		Network IP address <b>${ ip.address() }</b>
	</div>
</body>
</html>
`;
	response.write(html);
	response.end();
}


export default function start(): Promise<any> {
	return createServer({
		middleware: [welcomeRoute],
		port: 8888
	}).then((server) => {
		return server.start().then(() => {
			console.log(`server started on ${ server.port }`);
			opn(`http://localhost:${ server.port }`);
		});
	}, () => {
		console.error('server failed to start');
	});
}
