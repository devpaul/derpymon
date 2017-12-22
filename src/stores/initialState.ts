import { ApplicationState } from '../context/AppContext';
import { Asset } from '../context/AssetContext';
import { Environment } from '../context/OutsideContext';

export type Dimension3 = [ number, number, number ];

export interface Throw {
	direction: Dimension3;
	initialTime: number;
	position: Dimension3;
	speed: number;
	thrownTime?: number;
}

interface Monster {
	distance: number;
	height: number;
	name: string;
}

export interface AppState {
	assets: Asset[];
	debug: boolean;
	initialization: {
		aframe: boolean;
		monsters: boolean;
	};
	isLoadingState: boolean;
	state: ApplicationState;
	outsideContext: {
		environment: Environment;
		derpyball?: Throw;
		monster?: Monster;
	};
}

export default function initialState(): AppState {
	return {
		assets: [],
		debug: false,
		initialization: {
			aframe: false,
			monsters: false
		},
		isLoadingState: false,
		state: ApplicationState.Initial,
		outsideContext: {
			environment: Environment.Forest
		}
	};
}
