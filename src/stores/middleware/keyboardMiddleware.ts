import { Dispatch, Middleware } from 'redux';
import { ActionType } from '../../actions/ActionType';
import { Handle } from '@dojo/interfaces/core';
import { removeDerpyball, throwDerpyball } from '../../actions/outside';

let listenerHandle: Handle | undefined;

function attachListener(dispatch: Dispatch<any>) {
	function onKeyDown(event: KeyboardEvent) {
		if (event.keyCode === 32) {
			const ball: any = {
				direction: [ 1, 0, 0],
				initialTime: performance.now(),
				position: [ 0, 3, -4],
				speed: 1
			};
			dispatch(throwDerpyball(ball));
		}
		else if (event.key === '-') {
			dispatch(removeDerpyball());
		}
	}
	document.addEventListener('keydown', onKeyDown);
}

function detachListener() {
	if (listenerHandle) {
		listenerHandle.destroy();
		listenerHandle = undefined;
	}
}

const keyboardMiddleware: Middleware = ({ dispatch }) => next => (action: any) => {
	switch (action.type) {
		case ActionType.AttachKeyboard:
			detachListener();
			attachListener(dispatch);
			break;
		case ActionType.DetachKeyboard:
			detachListener();
			break;
	}
};

export default keyboardMiddleware;
