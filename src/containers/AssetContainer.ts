import Container from '../framework/Container';
import Assets from '../widgets/Assets';
import AppContext from '../context/AppContext';

const AssetContainer = Container(Assets, 'app-state', {
	getProperties(context: AppContext) {
		return {
			assets: context.assets
		}
	}
});

export default AssetContainer;
