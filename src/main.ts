import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import initialize from './initialize';
import AppContainer from './containers/AppContainer';

const root = document.querySelector('go-derpy') || undefined;

if (!root) {
	throw new Error('cannot find target node');
}

const registry = initialize();
const Projector = ProjectorMixin(AppContainer);
const projector = new Projector();
projector.setProperties({ registry });
projector.append(root);

(<any> root.ownerDocument).registry = registry;
(<any> root.ownerDocument).projector = projector;
