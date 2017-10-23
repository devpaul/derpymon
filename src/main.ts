import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';
import initialize from './initialize';

// Require globals
require('aframe');
require('aframe-environment-component');

const root = document.querySelector('go-derpy') || undefined;

if (!root) {
	throw new Error('cannot find target node');
}

const registry = initialize();

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });
projector.append(root);
