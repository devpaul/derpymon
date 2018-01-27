import { State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';
import { STORE_LABEL } from '../constants';
import AppContext from '../context/AppContext';
import { Store } from 'redux';
import { throwDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';
import { throws } from '../util/throws';
import { ProxyRegistry } from '../framework/proxyRegistry';

export default class ControlsContainer extends Container(Controls, State.Registry, {
	getProperties(registry: ProxyRegistry): ControlsProperties {
		const app: AppContext = registry[State.App] || throws();
		const store: Store<AppContext> = registry[STORE_LABEL] || throws();

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
