import Executor, { Action } from '../framework/Executor';
import monsters from '../configuration/monsters';

export type LoadMonsterAction = Action<undefined, Executor>;

export default function loadMonsters({ state: executor }: LoadMonsterAction) {
	// TODO eventually monsters can come from an async load
	executor.execute('loadedMonsters', monsters);
}
