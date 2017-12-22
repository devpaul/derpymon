import Registry from '@dojo/widget-core/Registry';
import AppContext from './context/AppContext';
import AssetContext from './context/AssetContext';
import OutsideContext from './context/OutsideContext';
import { attachListener } from './stores/keyboardMiddleware';
import { createStore } from 'redux';
import derpymonReducer from './stores/derpymonReducer';
import { STORE_LABEL } from './constants';
import ReduxInjector from '@dojo/interop/redux/ReduxInjector';

// Require globals
require('aframe');
require('aframe-environment-component');
require('aframe-physics-system');

export const enum State {
	App = 'app-state',
	Asset = 'assets',
	Outside = 'outside'
}

export default function initialize() {
	const registry = new Registry();
	const appContext = new AppContext();
	const assetContext = new AssetContext();
	const outsideContext = new OutsideContext();

	registry.defineInjector(State.App, appContext);
	registry.defineInjector(State.Asset, assetContext);
	registry.defineInjector(State.Outside, outsideContext);

	attachListener(outsideContext);

	// Redux stuff
	const store = createStore(derpymonReducer);
	registry.defineInjector(STORE_LABEL, new ReduxInjector(store));

	return registry;
}
