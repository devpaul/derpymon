import { Action } from '../framework/Executor';
import OutsideContext from '../context/OutsideContext';

export type RandomizeEncounterAction = Action<undefined, OutsideContext>;

export default function randomizeEncounter({ state: outside }: RandomizeEncounterAction) {
	const monsters = outside.getMonsterDefinitions();
	const num = Math.floor(Math.random() * monsters.length);
	const monster = monsters[num];
	const {
		heights,
		name
	} = monster;
	const distance = Math.random() * 8 + 2;
	const height = Math.random() * (heights.max - heights.min) + heights.min;

	outside.setMonster({
		name,
		height,
		distance
	});
};
