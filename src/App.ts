import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Outside from './stages/Outside';
import Assets from './framework/Assets';
import { genericMapper, Monster, monsters } from './commands/initialize/characters';
import { Container } from '@dojo/widget-core/Container';
import Controls from './framework/Controls';

export default class App extends WidgetBase<WidgetProperties> {
	private static selectMonster(): Monster {
		const num = Math.floor(Math.random() * monsters.length);
		return monsters[num];
	}

	monster = App.selectMonster();

	protected render(): DNode {
		const AssetEntity = Container(Assets, 'assets', genericMapper());

		return v('a-scene', [
			w(AssetEntity, { }),
			w(Controls, {}),
			w(Outside, {
				monster: this.monster,
			})
		]);
	}
}
