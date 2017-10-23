import Outside, { OutsideProperties } from '../widgets/Outside';
import Container from '../framework/Container';
import { throws } from '../util/properties';
import OutsideContext from '../context/OutsideContext';
import AppContext from '../context/AppContext';

const OutsideContainer = Container(Outside, [ 'outside', 'app-state' ], {
	getProperties(payload: [OutsideContext, AppContext]): OutsideProperties {
		const [
			outside = throws(),
			appContext = throws()
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
			monster
		}
	}
});

export default OutsideContainer;
