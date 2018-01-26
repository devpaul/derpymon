import Assets from '../widgets/Assets';
import AssetContext from '../context/AssetContext';
import { State } from '../initialize';
import Container from '@dojo/widget-core/Container';

export default class AssetContainer extends Container(Assets, State.Asset, {
	getProperties(context: AssetContext) {
		return {
			assets: context.assets
		};
	}
}) {}
