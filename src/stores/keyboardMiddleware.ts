import throwDerpyball from '../commands/throwDerpyball';
import removeDerpyball from '../commands/removeDerpyball';
import { Handle } from '@dojo/interfaces/core';
import OutsideContext, { Throw } from '../context/OutsideContext';

let listenerHandle: Handle | undefined;

export function attachListener(outside: OutsideContext) {
	function onKeyDown(event: KeyboardEvent) {
		if (event.keyCode === 32) {
			const ball: Throw = {
				direction: [ 1, 0, 0],
				initialTime: performance.now(),
				position: [ 0, 3, -4],
				speed: 1
			};
			throwDerpyball(ball, outside);
		}
		else if (event.key === '-') {
			removeDerpyball(outside);
		}
	}
	document.addEventListener('keydown', onKeyDown);
}

export function detachListener() {
	if (listenerHandle) {
		listenerHandle.destroy();
		listenerHandle = undefined;
	}
}
