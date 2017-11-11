import { CustomElementDescriptor } from '@dojo/widget-core/customElements';
import initialize from './initialize';
import AppContainer from './containers/AppContainer';

export default function createDerpymonElement(): CustomElementDescriptor {
	return {
		tagName: 'go-derpy',
		widgetConstructor: AppContainer,
		events: [],
		properties: [],
		initialization() {
			return initialize();
		}
	}
}
