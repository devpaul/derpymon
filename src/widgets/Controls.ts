import { v } from '@dojo/widget-core/d';
import { DNode, EventHandler } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface ControlsProperties {
	onActionButtonPressed?: EventHandler;
	onActionButtonReleased?: EventHandler;
}

export default class Controls extends WidgetBase<ControlsProperties> {
	protected render(): DNode[] {
		return [
			v('a-entity', <any> {
				'class': '.controls',
				'daydream-controls': ''
			}),
			v('a-entity', {
				'class': '.controls',
				'vive-controls': ''
			})
		];
	}
}
