import { Action } from '../framework/Executor';
import { MonsterConfigurationItem } from '../configuration/monsters';
import OutsideContext from '../context/OutsideContext';
import { throws } from '../util/properties';
import AssetContext from '../context/AssetContext';

export type RegisterMonstersAction = Action<Array<MonsterConfigurationItem>, [ AssetContext, OutsideContext ]>;

export default function registerMonsters({
	payload: monsters = throws(),
	state: [ appContext, outsideContext ] = throws()
}: RegisterMonstersAction) {
	for (let monster of monsters) {
		appContext.addObjMtlAssets(monster.name, monster.obj, monster.mtl);
		outsideContext.addMonster({
			name: monster.name,
			heights: monster.heights,
			environment: monster.environment
		});
	}
};
