import { setLogLevel } from 'webserv/log';
import startWelcomeServer from './servers/welcomeServer';
import distServer from './servers/distServer';
import proxyServer from './servers/proxyServer';

setLogLevel('debug');

const servers = [
	startWelcomeServer(),
	distServer(),
	proxyServer()
];

Promise.all(servers).catch(() => {
	console.log('Servers started');
	process.exit();
});
