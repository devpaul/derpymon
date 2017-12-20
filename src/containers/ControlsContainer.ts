import Container from '../framework/Container';
import { State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';
import throwDerpyball from '../commands/throwDerpyball';

const ControlsContainer = Container(Controls, [ State.App, State.Outside ], {
	getProperties([ app, outside ]): ControlsProperties {
		return {
			onActionButtonPressed() {
				console.log('pressed', app.state);
				const derpyball: Throw = {
					direction: [ 1, 0, 0],
					initialTime: performance.now(),
					position: [ 0, 3, -4],
					speed: 1
				};
				throwDerpyball(derpyball, outside);
			},
			onActionButtonReleased() {
				console.log('released', app.state);
			}
		}
	}
});

export default ControlsContainer;
