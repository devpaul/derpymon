import Container from '../framework/Container';
import App, { AppProperties } from '../App';
import AppContext from '../context/AppContext';
import { ActionType, State } from '../initialize';
import Executor from '../framework/Executor';

const AppContainer = Container(App, [ State.App, State.Executor ], {
	getProperties([ app, executor ]: [ AppContext, Executor ]): AppProperties {
		return {
			isLoadingState: app.isLoadingState,
			state: app.state,

			initialize() {
				executor.execute(ActionType.Initialize);
			}
		}
	}
});

export default AppContainer;
