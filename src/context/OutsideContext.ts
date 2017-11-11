import { InjectorBase } from '../framework/InjectorBase';

interface Monster {
	distance: number;
	height: number;
	name: string;
}

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

export default class OutsideContext extends InjectorBase {
	private _environment: Environment = Environment.Forest;
	private _monster?: Monster;
	private _monsterDefinitions: Map<string, MonsterDefinition> = new Map();

	get environment(): Environment {
		return this._environment;
	}

	get monster(): Monster | undefined {
		return this._monster;
	}

	addMonster(definitions: MonsterDefinition) {
		this._monsterDefinitions.set(definitions.name, definitions);
	}

	randomizeEncounter() {
		const {
			heights,
			name,
		} = this.randomMonster();
		const distance = Math.random() * 8 + 2;
		const height = Math.random() * (heights.max - heights.min) + heights.min;

		this.setMonster({
			name,
			height,
			distance
		});
	}

	setEnvironment(name: Environment) {
		if (this._environment !== name) {
			this._environment = name;
			this.emitInvalidate();
		}
	}

	setMonster(monster: Monster | undefined) {
		if (this._monster !== monster) {
			this._monster = monster;
			this.emitInvalidate();
		}
	}

	private randomMonster() {
		const max = this._monsterDefinitions.size;
		const num = Math.floor(Math.random() * max);
		const definitions = Array.from(this._monsterDefinitions.values());
		return definitions[num];
	}
}
