import App from './../../src/App';
import { default as harness, Harness } from '@dojo/test-extras/harness';
import { w } from '@dojo/widget-core/d';
import SceneContainer from '../../src/containers/SceneContainer';
import { DNode } from '@dojo/widget-core/interfaces';

const { registerSuite } = intern.getInterface('object');

let widget: Harness<App>;

function expectedRender(): DNode {
	return w(SceneContainer, {});
}

registerSuite('App', {
	beforeEach() {
		widget = harness(App);
	},

	tests: {
		render() {
			widget.expectRender(expectedRender());
		}
	}
});
