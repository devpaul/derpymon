import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Outside from './stages/Outside';
import Assets from './framework/Assets';
import { MonsterName, monsters } from './definitions/characters';
import { Container } from '@dojo/widget-core/Container';
import Controls from './framework/Controls';
import genericMapper from './framework/util/genericMapper';

export default class App extends WidgetBase<WidgetProperties> {
	private static selectMonster(): MonsterName {
		const num = Math.floor(Math.random() * monsters.length);
		return monsters[num];
	}

	monster = App.selectMonster();

	distance = Math.random() * 8 + 2;

	protected render(): DNode {
		const AssetEntity = Container(Assets, 'assets', genericMapper());

		return v('a-scene', [
			w(AssetEntity, { }),
			w(Controls, {}),
			w(Outside, {
				monster: this.monster,
				monsterDistance: this.distance
			}),
		]);
	}
}
