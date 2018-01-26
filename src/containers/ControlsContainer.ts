import { State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';
import { STORE_LABEL } from '../constants';
import AppContext from '../context/AppContext';
import { Store } from 'redux';
import { throwDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';
import Registry from '@dojo/widget-core/Registry';
import { throws } from '../util/throws';

export default class ControlsContainer extends Container(Controls, State.Registry, {
	getProperties(registry: Registry): ControlsProperties {
		const app: AppContext = (registry.getInjector(State.App) || throws()).get();
		const store: Store<AppContext> = (registry.getInjector(STORE_LABEL) || throws()).get();

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
