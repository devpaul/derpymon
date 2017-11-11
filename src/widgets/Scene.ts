import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import Controls from '../widgets/Controls';
import AssetContainer from '../containers/AssetContainer';
import OutsideContainer from '../containers/OutsideContainer';
import { ApplicationState } from '../context/AppContext';

export interface SceneProperties extends WidgetProperties {
	debug?: boolean;
	state: string;
}

export default class Scene extends WidgetBase<SceneProperties> {
	protected renderInitial() {
		return v('div', [
			'loading'
		]);
	}

	protected renderOutside() {
		const {
			debug = false,
		} = this.properties;

		return v('a-scene', {
			physics: `debug: ${ debug }`
		}, [
			w(AssetContainer, {}),
			w(Controls, {}),
			w(OutsideContainer, {}),
		]);
	}

	protected render(): DNode {
		const {
			debug = false,
			state = ApplicationState.Initial
		} = this.properties;

		switch (state) {
			case ApplicationState.Outside:
				return this.renderOutside();
			default:
				return this.renderInitial();
		}
	}
}
