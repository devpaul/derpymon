import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Outside from './stages/Outside';
import Assets from './framework/Assets';
import { Monster } from './commands/initialize/characters';

export default class App extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		return v('a-scene', [
			w(Assets, {
				assets: [
					{ id: 'charderp-obj', src: 'assets/charderp.obj'},
					{ id: 'charderp-mtl', src: 'assets/charderp.mtl'}
				]
			}),
			w(Outside, {
				monster: Monster.CharDerp
			})
		]);
	}
}
