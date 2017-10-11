import { initialize as initCharacters } from './definitions/characters';
import registerHeightComponent from './components/heightComponent';
import registerTrackPosition from './components/trackPosition';

let initialized = false;

export default function initialize() {
	if (initialized) {
		console.error('Application already initialized');
	}

	initCharacters();
	registerHeightComponent();
	registerTrackPosition();
	initialized = true;
}
