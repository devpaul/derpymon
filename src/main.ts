import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import initialize, { ActionType } from './initialize';
import AppContainer from './containers/AppContainer';
import Executor from './framework/Executor';

const root = document.querySelector('go-derpy') || undefined;

if (!root) {
	throw new Error('cannot find target node');
}

const registry = initialize();
const Projector = ProjectorMixin(AppContainer);
const projector = new Projector();
projector.setProperties({ registry });
projector.append(root);

// TODO move this into a listener
document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.keyCode === 32) {
		const executor = registry.getInjector<Executor>('executor');
		if (!executor) {
			console.warn('missing executor');
			return;
		}
		const ball = {
			direction: [ 1, 0, 0],
			initialTime: performance.now(),
			position: [ 0, 3, -4],
			speed: 1
		};
		executor.execute(ActionType.ThrowDerpyball, ball);
	}
	else if (event.key === '-') {
		const executor = registry.getInjector<Executor>('executor');
		if (!executor) {
			console.warn('missing executor');
			return;
		}
		executor.execute(ActionType.RemoveDerpyball);
	}
});

(<any> root.ownerDocument).registry = registry;
(<any> root.ownerDocument).projector = projector;
