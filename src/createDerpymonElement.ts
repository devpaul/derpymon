import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import App from './App';
import initialize from './initialize';

// Require globals
require('aframe');
require('aframe-environment-component');

export default function createDerpymonElement(): CustomElementDescriptor {
	return {
		tagName: 'go-derpy',
		widgetConstructor: App,
		events: [],
		properties: [],
		initialization() {
			return initialize();
		}
	}
}
