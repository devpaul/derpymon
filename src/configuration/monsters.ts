import { Environment, MonsterDefinition } from '../context/OutsideContext';
import { ObjModelAsset } from '../interfaces';
import { assign } from '@dojo/shim/object';

export type MonsterConfigurationItem = MonsterDefinition & ObjModelAsset;

export const enum MonsterName {
	CharDerp = 'charderp',
	Robot = 'robot'
}

const assetFolder = 'assets/characters/';

function createMonster(name: string): { name: string } & ObjModelAsset {
	return {
		name,
		mtl: `${ assetFolder }${ name }.mtl`,
		obj: `${ assetFolder }${ name }.obj`
	};
}

const monsters: Array<MonsterConfigurationItem> = [
	assign(createMonster(MonsterName.CharDerp), {
		environment: Environment.Forest,
		heights: { min: 1.5, max: 2 }
	}),
	assign(createMonster(MonsterName.Robot), {
		environment: Environment.Forest,
		heights: { min: 1.5, max: 2 }
	})
];

export default monsters;
