import Outside, { OutsideProperties } from '../widgets/Outside';
import OutsideContext from '../context/OutsideContext';
import { State } from '../initialize';
import AssetContext from '../context/AssetContext';
import { STORE_LABEL } from '../constants';
import { Store } from 'redux';
import { removeDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';
import Registry from '@dojo/widget-core/Registry';
import { throws } from '../util/throws';
import AppContext from '../context/AppContext';

export default class OutsideContainer extends Container(Outside, State.Registry, {
	getProperties(registry: Registry): OutsideProperties {
		const outside: OutsideContext = (registry.getInjector(State.Outside) || throws()).get();
		const asset: AssetContext = (registry.getInjector(State.Asset) || throws()).get();
		const store: Store<AppContext> = (registry.getInjector(STORE_LABEL) || throws()).get();

		let monster: OutsideProperties['monster'];
		const monsterInfo = outside.monster;
		if (monsterInfo) {
			const assets = asset.getObjMtlAssets(monsterInfo.name);
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
