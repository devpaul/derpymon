import Registry from '@dojo/widget-core/Registry';
import AppContext from './context/AppContext';
import AssetContext from './context/AssetContext';
import OutsideContext from './context/OutsideContext';
import { applyMiddleware, createStore } from 'redux';
import derpymonReducer from './stores/derpymonReducer';
import { STORE_LABEL } from './constants';
import ReduxInjector from '@dojo/interop/redux/ReduxInjector';
import keyboardMiddleware from './stores/middleware/keyboardMiddleware';
import createInjectorMiddleware from './stores/middleware/injectorMiddleware';
import thunk from 'redux-thunk';
import Injector from '@dojo/widget-core/Injector';

// Require globals
require('aframe');
require('aframe-environment-component');
require('aframe-physics-system');

export const enum State {
	App = 'app-state',
	Asset = 'assets',
	Outside = 'outside',
	Registry = 'registry'
}

export default function initialize() {
	const registry = new Registry();
	const appContext = new AppContext();
	const assetContext = new AssetContext();
	const outsideContext = new OutsideContext();

	registry.defineInjector(State.App, appContext);
	registry.defineInjector(State.Asset, assetContext);
	registry.defineInjector(State.Outside, outsideContext);
	registry.defineInjector(State.Registry, new Injector(registry));

	// Redux stuff
	const store = createStore(derpymonReducer, applyMiddleware(
		thunk,
		keyboardMiddleware,
		createInjectorMiddleware(registry)
	));
	registry.defineInjector(STORE_LABEL, new ReduxInjector(store));

	return registry;
}
