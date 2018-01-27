import Outside, { OutsideProperties } from '../widgets/Outside';
import { RegistryItems, State } from '../initialize';
import { removeDerpyball } from '../actions/outside';
import Container from '@dojo/widget-core/Container';

export default class OutsideContainer extends Container(Outside, State.Registry, {
	getProperties({ assets, outside, store }: RegistryItems): OutsideProperties {
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
