import { initialize as initCharacters } from './characters';
import { register as registerHeightComponent } from './heightComponent';

export default function initialize() {
	registerHeightComponent();
	initCharacters();
}
