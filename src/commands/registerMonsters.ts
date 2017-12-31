import { MonsterConfigurationItem } from '../data/monsters';
import OutsideContext from '../context/OutsideContext';
import AssetContext from '../context/AssetContext';

export default function registerMonsters(monsters: MonsterConfigurationItem[], assets: AssetContext, outsideContext: OutsideContext) {
	for (let monster of monsters) {
		assets.addObjMtlAssets(monster.name, monster.assets.obj, monster.assets.mtl);
		outsideContext.addMonster({
			name: monster.name,
			heights: monster.heights,
			environment: monster.environment
		});
	}
}
