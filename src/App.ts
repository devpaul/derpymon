import { w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { ApplicationState } from './context/AppContext';
import { Scene } from 'three';
import SceneContainer from './containers/SceneContainer';

export interface AppProperties extends WidgetProperties {
	isLoadingState: boolean;
	state: ApplicationState;

	initialize(): void;
}

export default class App extends WidgetBase<AppProperties> {
	manageState() {
		const {
			isLoadingState,
			state,

			initialize
		} = this.properties;

		if (!isLoadingState && state === ApplicationState.Initial) {
			initialize();
		}
	}

	protected render(): DNode {
		this.manageState();

		return w(SceneContainer, {});
	}
}
