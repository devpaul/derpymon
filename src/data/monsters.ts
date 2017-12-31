export const enum Environment {
	Checkerboard = 'checkerboard',
	Desert = 'egypt',
	Forest = 'forest'
}

/**
 * Defines a monster's traits
 */
export interface MonsterDefinition {
	/** environment where the monster appears */
	environment: Environment;
	/** the range of heights for this monster */
	heights: {
		min: number,
		max: number
	};
	/** The name of the monster */
	name: string;
}

/**
 * OBJ model definition consists of an obj file (or inline path) and an optional mtl material file
 */
export interface ObjModelAsset {
	mtl?: string;
	obj: string;
}

export interface MonsterConfigurationItem extends MonsterDefinition {
	assets: ObjModelAsset & { [ key: string ]: string };
}

const enum MonsterName {
	CharDerp = 'charderp',
	Robot = 'robot'
}

const assetFolder = 'assets/characters/';

function createMonster(name: string, definition: {
	environment: MonsterConfigurationItem['environment'],
	heights: MonsterConfigurationItem['heights']
}): MonsterConfigurationItem {
	return {
		assets: {
			mtl: `${ assetFolder }${ name }.mtl`,
			obj: `${ assetFolder }${ name }.obj`
		},
		... definition,
		name
	};
}

/**
 * Provide a list of monster configuration items.
 * This list may be provided by a server if one is available
 */
const monsters: Array<MonsterConfigurationItem> = [
	createMonster(MonsterName.CharDerp, {
		environment: Environment.Forest,
		heights: { min: 1.5, max: 2 }
	}),
	createMonster(MonsterName.Robot, {
		environment: Environment.Forest,
		heights: { min: 1.5, max: 2 }
	})
];

export default monsters;
