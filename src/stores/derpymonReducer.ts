import { AnyAction } from 'redux';
import initialState, { AppState } from './configuration/initialState';

export default function derpymonReducer(state: AppState = initialState(), { type }: AnyAction): any {
	// TODO just return the state here until data is migrated from dojo injectors
	switch (type) {
		default:
			return state;
	}
}
