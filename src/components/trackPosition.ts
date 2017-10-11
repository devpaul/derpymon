const AFrame = require('aframe');

export const trackPosition = 'track-position';

interface TrackPositionProperties extends AFrame.Component {
	controllerBody: THREE.Object3D;
}

export default function register() {
	AFrame.registerComponent(trackPosition, {
		schema: {
			type: 'string'
		},

		init() {

		},

		update() {
			const targetName = this.data;
			const target = document.querySelector(targetName);
			// TODO used with Daydream controller models
			this.controllerBody = target.getObjectByName('Body_Body_Cylinder');
		},

		tick(this: TrackPositionProperties) {
			if (!this.controllerBody) {
				return;
			}
			const controllerObj = this.controllerBody.geometry;
			this.el!.setAttribute('position', position);
		},

		getBoundingSphere() {

		}
	});
}

