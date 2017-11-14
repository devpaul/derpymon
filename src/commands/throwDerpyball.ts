import { Action } from '../framework/Executor';
import OutsideContext, { Throw } from '../context/OutsideContext';

export type ThrowDerpyballAction = Action<Throw, OutsideContext>;

export default function throwDerpyball({ payload, state: outside }: ThrowDerpyballAction) {
	if (payload) {
		outside.throwBall(payload)
	}
}
