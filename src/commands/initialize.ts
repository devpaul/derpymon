import AppContext, { ApplicationState } from '../context/AppContext';
import registerHeightComponent from '../components/heightComponent';
import AssetContext from '../context/AssetContext';
import OutsideContext from '../context/OutsideContext';
import monsters from '../configuration/monsters';
import registerMonsters from './registerMonsters';
import randomizeEncounter from './randomizeEncounter';

export default function initialize(app: AppContext, assets: AssetContext, outside: OutsideContext) {
	if (app.state !== ApplicationState.Initial) {
		throw new Error('Application already initialized');
	}

	app.isLoadingState = true;

	if (!app.initialized.monsters) {
		// TODO NOTE: This is the problem w/ multi-state w/o an executor to inject
		// commands accumulate requirements from their children making it a mess to unwind
		registerMonsters(monsters, assets, outside);
		app.initialized.monsters = true;
	}

	if (!app.initialized.aframe) {
		registerHeightComponent();
		app.initialized.aframe = true;
	}

	if (app.initialized.monsters && app.initialized.aframe) {
		randomizeEncounter(outside);
		app.isLoadingState = false;
		app.state = ApplicationState.Outside;
	}
}
