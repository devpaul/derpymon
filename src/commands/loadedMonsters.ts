import Executor from '../framework/Executor';
import monsters from '../configuration/monsters';
import AppContext from '../context/AppContext';
import registerMonsters from './registerMonsters';

export default function loadedMonsters(app: AppContext) {
	app.initialized.monsters = true;
	registerMonsters()
	executor.execute('registerMonsters', monsters);
}
