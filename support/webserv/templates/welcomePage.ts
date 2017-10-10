import * as ip from 'ip';
import { IncomingMessage } from 'http';

export default function welcomePage(
	request: IncomingMessage,
	address = ip.address()
) {
	const [ host = 'localhost' ] = request.headers.host.split(':');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Derpymon</title>
	<style>
		body, html {
			margin: 0;
			padding: 0;
			height: 100vh;
		}
		header {
			background: linear-gradient(blue, lightblue);
			padding: 10px;
		}
		header h1 {
			margin: 0 0.5em 0 0;
			color: #ffd522;
			text-shadow: 
				-1px -1px 0 black,
				1px -1px 0 black,
				-1px 1px 0 blue,
				1px 1px 0 blue;
			display: inline-block;
		}
		header h2 {
			color: white;
			display: inline-block;
			font-family: cursive;
			margin: 0;
		}
		section {
			border-bottom: 1px solid lightgray;
		}
		section a {
			display: block;
			padding: 10px 1em;
			text-decoration: none;
			color: black;
		}
		section a:hover {
			background: lightblue;
		}
		section a:hover *:first-child {
			text-decoration: underline;
		}
		footer {
			position: absolute;
			bottom: 0;
			padding: 10px;
			margin: 0;
			width: 100%;
			background: linear-gradient(lightblue, white);
		}
	</style>
</head>
<body>
	<header>
		<h1>Derpymon</h1>
		<h2>The dev server</h2>
	</header>
	<section>
		<a href="http://${ host }:8010">
			<p>Local dev server</p>
			<p>proxies to webpack dev server</p>
		</a>
	</section>
	<section>
		<a href="https://${ host }:8001">
			<p>HTTPS server</p>
			<p>serves files from the dist directory</p>
		</a>
	</section>
	<footer>
		Network IP address <b>${ address }</b>
	</footer>
</body>
</html>
`;
}
