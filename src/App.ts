import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Outside from './stages/Outside';

export default class App extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		return v('a-scene', [
			w(Outside, { })
		]);
	}
}
