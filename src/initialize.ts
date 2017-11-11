import Registry from '@dojo/widget-core/Registry';
import AppContext from './context/AppContext';
import OutsideContext from './context/OutsideContext';
import Executor from './framework/Executor';
import initializeApp from './commands/initialize';
import loadMonsters from './commands/loadMonsters';
import randomizeEncounter from './commands/randomizeEncounter';
import registerMonsters from './commands/registerMonsters';
import AssetContext from './context/AssetContext';
import loadedMonsters from './commands/loadedMonsters';

// Require globals
require('aframe');
require('aframe-environment-component');
require('aframe-physics-system');

export const enum State {
	App = 'app-state',
	Asset = 'assets',
	Executor = 'executor',
	Outside = 'outside'
}

export const enum ActionType {
	Initialize = 'initialize',
	LoadMonsters = 'loadMonsters',
	LoadedMonsters = 'loadedMonsters',
	RandomizeEncounter = 'randomizeEncounter',
	RegisterMonsters = 'registerMonsters'
}

export default function initialize() {
	const registry = new Registry();
	const executor = new Executor(registry, [
		{ type: ActionType.Initialize, handler: initializeApp, state: [ State.App, State.Executor ] },
		{ type: ActionType.LoadMonsters, handler: loadMonsters, state: State.Executor },
		{ type: ActionType.LoadedMonsters, handler: loadedMonsters, state: [ State.App, State.Executor ] },
		{ type: ActionType.RandomizeEncounter, handler: randomizeEncounter, state: State.Outside },
		{ type: ActionType.RegisterMonsters, handler: registerMonsters, state: [ State.Asset, State.Outside ] }
	]);
	const appContext = new AppContext();
	const assetContext = new AssetContext();
	const outsideContext = new OutsideContext();

	registry.defineInjector(State.App, appContext);
	registry.defineInjector(State.Asset, assetContext);
	registry.defineInjector(State.Executor, executor);
	registry.defineInjector(State.Outside, outsideContext);

	return registry;
}
