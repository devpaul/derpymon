import App, { AppProperties } from '../App';
import AppContext from '../context/AppContext';
import { State } from '../initialize';
import initialize from '../commands/initialize';
import AssetContext from '../context/AssetContext';
import OutsideContext from '../context/OutsideContext';
import Container from '@dojo/widget-core/Container';
import { throws } from '../util/throws';
import { ProxyRegistry } from '../framework/proxyRegistry';

export default class AppContainer extends Container(App, State.Registry, {
	getProperties(registry: ProxyRegistry): AppProperties {
		const app: AppContext = registry[State.App] || throws();
		const assets: AssetContext = registry[State.Asset] || throws();
		const outside: OutsideContext = registry[State.Outside] || throws();

		return {
			isLoadingState: app.isLoadingState,
			state: app.state,

			initialize() {
				initialize(app, assets, outside);
			}
		};
	}
}) {}
