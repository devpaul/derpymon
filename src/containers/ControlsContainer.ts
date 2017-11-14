import Container from '../framework/Container';
import { ActionType, State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';

const ControlsContainer = Container(Controls, [ State.App, State.Executor ], {
	getProperties([ app, executor]): ControlsProperties {
		return {
			onActionButtonPressed() {
				console.log('pressed', app.state);
				const derpyball: Throw = {
					direction: [ 1, 0, 0],
					initialTime: performance.now(),
					position: [ 0, 3, -4],
					speed: 1
				};
				executor.execute({ type: ActionType.ThrowDerpyball, payload: derpyball });
			},
			onActionButtonReleased() {
				console.log('released', app.state);
			}
		}
	}
});

export default ControlsContainer;
