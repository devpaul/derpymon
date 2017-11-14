import { InjectorBase } from '../framework/InjectorBase';
import { assign } from '@dojo/core/lang';

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

declare type Dimension3 = [ number, number, number ];

export interface Throw {
	direction: Dimension3;
	initialTime: number;
	position: Dimension3;
	speed: number;
	thrownTime?: number;
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
	environment: Environment = Environment.Forest;

	private _derpyball?: Throw;
	private _monster?: Monster;
	private _monsterDefinitions: Map<string, MonsterDefinition> = new Map();

	get derpyball(): Throw | undefined {
		return this._derpyball;
	}

	get monster(): Monster | undefined {
		return this._monster;
	}

	addMonster(definitions: MonsterDefinition) {
		this._monsterDefinitions.set(definitions.name, definitions);
	}

	ballThrown() {
		if (this._derpyball && !this._derpyball.thrownTime) {
			this._derpyball.thrownTime = performance.now();
		}
	}

	getMonsterDefinitions(): MonsterDefinition[] {
		return Array.from(this._monsterDefinitions.values());
	}

	removeBall() {
		if (this._derpyball) {
			this._derpyball = undefined;
		}
	}

	throwBall(value: Throw) {
		if (!this._derpyball && value) {
			this._derpyball = {
				direction: <Dimension3> Array.from(value.direction),
				initialTime: value.initialTime || performance.now(),
				position: <Dimension3> Array.from(value.position),
				speed: value.speed
			}
		}
	}

	setMonster(monster: Monster | undefined) {
		this._monster = assign({}, monster);
	}
}
