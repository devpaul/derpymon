import { v } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

export interface OutsideProperties extends WidgetProperties {
}

export const OutsideBase = ThemeableMixin(WidgetBase);

@theme({})
export default class Outside extends OutsideBase<OutsideProperties> {
	protected render(): DNode {
		return v('a-entity', [
			v('a-plane', {
				color: '#258e26',
				height: '20',
				rotation: '-90 0 0',
				width: '20'
			}),
			v('a-sky', {
				color: '#859cff'
			})
		]);
	}
}
