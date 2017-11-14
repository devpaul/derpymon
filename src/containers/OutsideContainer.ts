import Outside, { OutsideProperties } from '../widgets/Outside';
import Container from '../framework/Container';
import { throws } from '../util/properties';
import OutsideContext from '../context/OutsideContext';
import { ActionType, State } from '../initialize';
import AssetContext from '../context/AssetContext';
import Executor from '../framework/Executor';

const OutsideContainer = Container(Outside, [ State.Outside, State.Asset, State.Executor ], {
	getProperties(payload: [ OutsideContext, AssetContext, Executor ]): OutsideProperties {
		const [
			outside = throws(),
			appContext = throws(),
			executor = throws()
		] = payload;
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
				}
			}
		}
		return {
			environment: outside.environment,
			derpyball: outside.derpyball,
			monster,

			removeDerpyball() {
				executor.execute(ActionType.RemoveDerpyball);
			}
		}
	}
});

export default OutsideContainer;
