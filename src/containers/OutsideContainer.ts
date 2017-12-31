import Outside, { OutsideProperties } from '../widgets/Outside';
import Container from '../framework/Container';
import OutsideContext from '../context/OutsideContext';
import { State } from '../initialize';
import AssetContext from '../context/AssetContext';
import { STORE_LABEL } from '../constants';
import { AppState } from '../stores/configuration/initialState';
import { Store } from 'redux';
import { removeDerpyball } from '../actions/outside';

export default class OutsideContainer extends Container(Outside, [ State.Outside, State.Asset, STORE_LABEL ], {
	getProperties([ outside, appContext, store ]: [ OutsideContext, AssetContext, Store<AppState> ]): OutsideProperties {
		let monster: OutsideProperties['monster'];
		const monsterInfo = outside.monster;
		if (monsterInfo) {
			const assets = appContext.getObjMtlAssets(monsterInfo.name);
			if (assets && assets.obj && assets.mtl) {
				monster = {
					distance: monsterInfo.distance,
					height: monsterInfo.height,
					mtl: `#${ assets.mtl.id }`,
					name: monsterInfo.name,
					obj: `#${ assets.obj.id }`
				};
			}
		}
		return {
			environment: outside.environment,
			derpyball: outside.derpyball,
			monster,

			removeDerpyball() {
				store.dispatch(removeDerpyball());
			}
		};
	}
}) {}
