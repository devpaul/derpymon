import App, { AppProperties } from '../App';
import AppContext from '../context/AppContext';
import { State } from '../initialize';
import initialize from '../commands/initialize';
import AssetContext from '../context/AssetContext';
import OutsideContext from '../context/OutsideContext';
import Container from '@dojo/widget-core/Container';
import Registry from '@dojo/widget-core/Registry';
import { throws } from '../util/throws';

export default class AppContainer extends Container(App, State.Registry, {
	getProperties(registry: Registry): AppProperties {
		const app: AppContext = (registry.getInjector(State.App) || throws()).get();
		const assets: AssetContext = (registry.getInjector(State.Asset) || throws()).get();
		const outside: OutsideContext = (registry.getInjector(State.Outside) || throws()).get();

		return {
			isLoadingState: app.isLoadingState,
			state: app.state,

			initialize() {
				initialize(app, assets, outside);
			}
		};
	}
}) {}
