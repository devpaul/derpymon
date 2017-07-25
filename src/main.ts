import 'aframe';
import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './App';

const root = document.querySelector('go-derpy') || undefined;

const Projector = ProjectorMixin(App);
const projector = new Projector();

projector.append(root);
