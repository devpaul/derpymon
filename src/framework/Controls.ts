import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export default class Controls extends WidgetBase<WidgetProperties> {
	protected render(): DNode[] {
		return [
			v('a-entity', {
				'vive-controls': 'hand: left'
			}),
			v('a-entity', {
				'vive-controls': 'hand: right'
			})
		];
	}
}
