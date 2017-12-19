import Executor from '../framework/Executor';
import AppContext, { ApplicationState } from '../context/AppContext';
import registerHeightComponent from '../components/heightComponent';

export default function initialize(app: AppContext, executor: Executor) {
	if (app.state !== ApplicationState.Initial) {
		throw new Error('Application already initialized');
	}

	app.isLoadingState = true;

	if (!app.initialized.monsters) {
		executor.execute(ActionType.LoadMonsters);
	}
	if (!app.initialized.aframe) {
		registerHeightComponent();
		app.initialized.aframe = true;
	}

	if (app.initialized.monsters && app.initialized.aframe) {
		executor.execute(ActionType.RandomizeEncounter);
		app.isLoadingState = false;
		app.state = ApplicationState.Outside;
	}
}
