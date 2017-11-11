import Container from '../framework/Container';
import Assets from '../widgets/Assets';
import AssetContext from '../context/AssetContext';
import { State } from '../initialize';

const AssetContainer = Container(Assets, State.Asset, {
	getProperties(context: AssetContext) {
		return {
			assets: context.assets
		}
	}
});

export default AssetContainer;
