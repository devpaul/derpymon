import Executor, { Action } from '../framework/Executor';
import monsters from '../configuration/monsters';
import AppContext from '../context/AppContext';

export type LoadedMonsterAction = Action<undefined, [ AppContext, Executor ]>;

export default function loadedMonsters({ state: [ app, executor ] }: LoadedMonsterAction) {
	app.initialized.monsters = true;
	executor.execute('registerMonsters', monsters);
}
