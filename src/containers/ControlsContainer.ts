import { RegistryItems, State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';
import { throwDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';

export default class ControlsContainer extends Container(Controls, State.Registry, {
	getProperties({ app, store }: RegistryItems): ControlsProperties {

		return {
			onActionButtonPressed() {
				console.log('pressed', app.state);
				const derpyball: Throw = {
					direction: [ 1, 0, 0],
					initialTime: performance.now(),
					position: [ 0, 3, -4],
					speed: 1
				};
				store.dispatch(throwDerpyball(derpyball));
			},
			onActionButtonReleased() {
				console.log('released', app.state);
			}
		};
	}
}) {}
