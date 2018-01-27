import App, { AppProperties } from '../App';
import { RegistryItems, State } from '../initialize';
import initialize from '../commands/initialize';
import Container from '@dojo/widget-core/Container';

export default class AppContainer extends Container(App, State.Registry, {
	getProperties({ app, assets, outside }: RegistryItems): AppProperties {

		return {
			isLoadingState: app.isLoadingState,
			state: app.state,

			initialize() {
				initialize(app, assets, outside);
			}
		};
	}
}) {}
