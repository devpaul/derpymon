import Executor, { Action } from '../framework/Executor';
import monsters from '../configuration/monsters';
import loadedMonsters from './loadedMonsters';

export default function loadMonsters(executor: Executor) {
	// TODO eventually monsters can come from an async load
	loadedMonsters()
	executor.execute('loadedMonsters', monsters);
}
