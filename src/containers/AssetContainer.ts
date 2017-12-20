import Container from '../framework/Container';
import Assets from '../widgets/Assets';
import AssetContext from '../context/AssetContext';
import { State } from '../initialize';

export default class AssetContainer extends Container(Assets, State.Asset, {
	getProperties(context: AssetContext) {
		return {
			assets: context.assets
		};
	}
}) {}
