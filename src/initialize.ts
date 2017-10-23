import registerHeightComponent from './components/heightComponent';
import Registry from '@dojo/widget-core/Registry';
import AppContext from './context/AppContext';
import OutsideContext from './context/OutsideContext';
import monsters from './configuration/monsters';

export default function initialize() {
	const registry = new Registry();
	const appContext = new AppContext();
	const outsideContext = new OutsideContext();
	registry.defineInjector('app-state', appContext);
	registry.defineInjector('outside', outsideContext);

	initializeMonsters(appContext, outsideContext);
	registerHeightComponent();
	outsideContext.randomizeEncounter();
	return registry;
}

function initializeMonsters(appContext: AppContext, outsideContext: OutsideContext) {
	for (let monster of monsters) {
		appContext.addObjMtlAssets(monster.name, monster.obj, monster.mtl);
		outsideContext.addMonster({
			name: monster.name,
			heights: monster.heights,
			environment: monster.environment
		})
	}
}
