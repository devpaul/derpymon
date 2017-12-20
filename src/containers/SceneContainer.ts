import Container from '../framework/Container';
import AppContext from '../context/AppContext';
import Scene, { SceneProperties } from '../widgets/Scene';
import { State } from '../initialize';

export default class SceneContainer extends Container(Scene, State.App, {
	getProperties(state: AppContext): SceneProperties {
		return {
			debug: state.debug,
			state: state.state
		};
	}
}) {}
