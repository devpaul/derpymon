import { InjectorBase } from '../framework/InjectorBase';

export const enum ApplicationState {
	Initial = 'initial',
	Outside = 'outside'
}

export default class AppContext extends InjectorBase {
	debug = true;

	initialized = {
		aframe: false,
		monsters: false
	};

	isLoadingState = false;

	state: ApplicationState = ApplicationState.Initial;
}
