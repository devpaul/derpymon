import { v } from '@dojo/widget-core/d';
import { DNode, EventHandler, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface ControlsProperties {
	onActionButtonPressed?: EventHandler,
	onActionButtonReleased?: EventHandler
}

function logEvent(name: string) {
	return (event: Event) => {
		console.log(name, event);
	}
}

export default class Controls extends WidgetBase<ControlsProperties> {
	protected render(): DNode[] {
		return [
			v('a-entity', <any> {
				id: 'controls',
				'daydream-controls': ''
			})
		];
	}
}
