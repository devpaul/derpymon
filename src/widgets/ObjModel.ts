import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';

export interface AssetProperties extends WidgetProperties {
	mtl: string;
	src: string;
	[ key: string ]: any;
}

export default class ObjModel<T extends AssetProperties> extends WidgetBase<T> {
	protected getProperties() {
		return Object.assign({}, this.properties);
	}

	protected render(): DNode {
		const props = this.getProperties();

		return v('a-obj-model', props);
	}
}
