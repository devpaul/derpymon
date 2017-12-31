import Container from '../framework/Container';
import { State } from '../initialize';
import Controls, { ControlsProperties } from '../widgets/Controls';
import { Throw } from '../context/OutsideContext';
import { STORE_LABEL } from '../constants';
import AppContext from '../context/AppContext';
import { Store } from 'redux';
import { AppState } from '../stores/configuration/initialState';
import { throwDerpyball } from '../actions/outside';

export default class ControlsContainer extends Container(Controls, [ State.App, STORE_LABEL ], {
	getProperties([ app, store ]: [ AppContext, Store<AppState> ]): ControlsProperties {
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
