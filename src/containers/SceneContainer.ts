import AppContext from '../context/AppContext';
import Scene, { SceneProperties } from '../widgets/Scene';
import { State } from '../initialize';
import Container from '@dojo/widget-core/Container';

export default class SceneContainer extends Container(Scene, State.App, {
	getProperties(state: AppContext): SceneProperties {
		return {
			debug: state.debug,
			state: state.state
		};
	}
}) {}
