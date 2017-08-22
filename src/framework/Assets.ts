import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';

export interface Asset {
	id: string;
	src: string;
}

export interface AssetProperties extends WidgetProperties {
	assets: Asset[];
}

export default class Assets extends WidgetBase<AssetProperties> {
	protected render(): DNode {
		const assets = this.properties.assets.map((asset) => {
			return v('a-asset-item', asset);
		});

		return v('a-assets', {}, assets);
	}
}
