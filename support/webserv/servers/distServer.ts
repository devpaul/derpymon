import createServer, { ServerType } from 'webserv/commands/createServer';
import LogRequest from 'webserv/middleware/LogRequest';
import route from 'webserv/handlers/route';
import ServePath from 'webserv/middleware/ServePath';
import * as path from 'path';

const baseDir = path.resolve(__dirname, '../../..');
console.log(baseDir);

export default function start() {
	return createServer({
		middleware: [
			new LogRequest(),
			route('/assets/*').wrap([
				new ServePath(path.join(baseDir, '/assets'))
			]),
			route('/node_modules/*').wrap([
				new ServePath(path.join(baseDir, '/node_modules'))
			]),
			new ServePath(path.join(baseDir, '/dist'))
		],
		type: ServerType.HTTPS,
		port: 8001,
		start: true
	});
}
