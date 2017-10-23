import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import AppContext from '../context/AppContext';

export interface AssetProperties extends WidgetProperties {
	assets?: AppContext['assets'];
}

export default class Assets extends WidgetBase<AssetProperties> {
	protected render(): DNode {
		const {
			assets = []
		} = this.properties;

		return v('a-assets', {}, assets.map((asset) => {
			return v('a-asset-item', asset);
		}));
	}
}
