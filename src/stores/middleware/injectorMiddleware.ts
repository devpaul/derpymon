import { Middleware } from 'redux';
import Registry from '@dojo/widget-core/Registry';
import { ActionType } from '../../actions/ActionType';
import { State } from '../../initialize';
import OutsideContext from '../../context/OutsideContext';

/**
 * Middleware that creates a bridge between redux action creators and dojo injectors
 */
export default function createInjectorMiddleware(registry: Registry): Middleware {
	return ({ dispatch, getState }) => next => (action: any) => {
		const { type } = action;
		const outside = registry.getInjector<OutsideContext>(State.Outside);

		switch (type) {
			case ActionType.RemoveDerpyball:
				outside && outside.removeBall();
				break;
			case ActionType.ThrowDerpyball:
				const ballThrow = action.payload;
				outside && outside.throwBall(ballThrow);
				break;
		}
	};
}
