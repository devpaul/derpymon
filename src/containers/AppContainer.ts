import Container from '../framework/Container';
import App, { AppProperties } from '../App';
import AppContext from '../context/AppContext';
import { State } from '../initialize';
import initialize from '../commands/initialize';
import AssetContext from '../context/AssetContext';
import OutsideContext from '../context/OutsideContext';

export default class AppContainer extends Container(App, [ State.App, State.Asset, State.Outside ], {
	getProperties([ app, assets, outside ]: [ AppContext, AssetContext, OutsideContext ]): AppProperties {
		return {
			isLoadingState: app.isLoadingState,
			state: app.state,

			initialize() {
				initialize(app, assets, outside);
			}
		};
	}
}) {}
