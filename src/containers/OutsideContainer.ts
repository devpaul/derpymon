import Outside, { OutsideProperties } from '../widgets/Outside';
import OutsideContext from '../context/OutsideContext';
import { State } from '../initialize';
import AssetContext from '../context/AssetContext';
import { STORE_LABEL } from '../constants';
import { Store } from 'redux';
import { removeDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';
import { throws } from '../util/throws';
import AppContext from '../context/AppContext';
import { ProxyRegistry } from '../framework/proxyRegistry';

export default class OutsideContainer extends Container(Outside, State.Registry, {
	getProperties(registry: ProxyRegistry): OutsideProperties {
		const assets: AssetContext = registry[State.Asset] || throws();
		const outside: OutsideContext = registry[State.Outside] || throws();
		const store: Store<AppContext> = registry[STORE_LABEL] || throws();

		let monster: OutsideProperties['monster'];
		const monsterInfo = outside.monster;
		if (monsterInfo) {
			const asset = assets.getObjMtlAssets(monsterInfo.name);
			if (asset && asset.obj && asset.mtl) {
				monster = {
					distance: monsterInfo.distance,
					height: monsterInfo.height,
					mtl: `#${ asset.mtl.id }`,
					name: monsterInfo.name,
					obj: `#${ asset.obj.id }`
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
