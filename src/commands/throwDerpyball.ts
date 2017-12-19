import OutsideContext, { Throw } from '../context/OutsideContext';

export default function throwDerpyball(payload: Throw, outside: OutsideContext) {
	if (payload) {
		outside.throwBall(payload)
	}
}
