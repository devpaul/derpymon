import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';
import { initialize as initCharacters } from './commands/initialize/characters';

const root = document.querySelector('go-derpy') || undefined;

if (!root) {
	throw new Error('cannot find target node');
}

initCharacters();

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append(root);
