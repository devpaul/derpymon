import { ActionType } from './ActionType';
import { Throw } from '../context/OutsideContext';

export function removeDerpyball() {
	return {
		type: ActionType.RemoveDerpyball
	};
}

export function throwDerpyball(ballThrow: Throw) {
	return {
		type: ActionType.ThrowDerpyball,
		payload: ballThrow
	};
}
