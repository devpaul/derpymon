import { AnyAction } from 'redux';
import initialState, { AppState } from './initialState';
import { ActionType } from '../actions/ActionType';

export default function derpymonReducer(state: AppState = initialState(), { type }: AnyAction): any {
	switch (type) {
		case ActionType.Initialize:
			// TODO
			break;
		case ActionType.LoadedMonsters:
			// TODO
			break;
		case ActionType.LoadMonsters:
			// TODO
			break;
		case ActionType.RandomizeEncounter:
			// TODO
			break;
		case ActionType.RegisterMonsters:
			// TODO
			break;
		case ActionType.RemoveDerpyball:
			// TODO
			break;
		case ActionType.ThrowDerpyball:
			// TODO
			break;
	}

	return state;
}
