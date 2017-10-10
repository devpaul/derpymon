import WebProxy from 'webserv/middleware/WebProxy';
import createServer, { ServerType } from 'webserv/commands/createServer';
import route from 'webserv/handlers/route';
import ServePath from 'webserv/middleware/ServePath';

const proxy = new WebProxy('http://localhost:9999', {
	ws: true
});

export default function start() {
	return createServer({
		middleware: [
			route('/assets/*').wrap([
				new ServePath('./assets')
			]),
			proxy
		],
		port: 8010,
		type: ServerType.HTTP,
		upgrade: proxy,
		start: true
	});
}
