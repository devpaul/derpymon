import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Controls from './widgets/Controls';
import AssetContainer from './containers/AssetContainer';
import OutsideContainer from './containers/OutsideContainer';

export default class App extends WidgetBase<WidgetProperties> {
	protected render(): DNode {
		return v('a-scene', [
			w(AssetContainer, {}),
			w(Controls, {}),
			w(OutsideContainer, {}),
		]);
	}
}
