import { Action } from '../framework/Executor';
import OutsideContext from '../context/OutsideContext';

export type RandomizeEncounterAction = Action<undefined, OutsideContext>;

export default function randomizeEncounter({ state: outsideContext }: RandomizeEncounterAction) {
	outsideContext.randomizeEncounter();
};
