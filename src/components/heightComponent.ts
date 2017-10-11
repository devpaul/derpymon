import { Box3 } from 'three';
const AFrame = require('aframe');

export const objHeight = 'objheight';

export const enum Event {
	HeightScale = 'heightScale'
}

// Avoids triggering a zero-determinant which makes object3D matrix non-invertible.
const zeroScale = 0.00001;

export default function register() {
	AFrame.registerComponent(objHeight, {
		schema: {
			type: 'int',
			'default': '0'
		},

		init() {
			this.boundingBox = null;
			this.el!.addEventListener('object3dset', () => {
				const mesh = this.el!.object3D;
				const box = new Box3().setFromObject(mesh);
				this.boundingBox = box;
				this.scaleToHeight(box);
			});
		},

		scaleToHeight(bounds: Box3) {
			const height = this.data;
			if (height !== 0) {
				const object3D = this.el!.object3D;
				const unscaledHeight = Math.abs(bounds.max.y - bounds.min.y);
				let scale = height / unscaledHeight;
				if (scale === 0) {
					scale = zeroScale;
				}
				console.log(bounds, );
				// Scale to desired height
				object3D.scale.set(scale, scale, scale);
				// Place on the ground
				const worldPos = object3D.getWorldPosition();
				const groundY = -bounds.min.y * scale;
				object3D.position.set(worldPos.x, groundY, worldPos.z);
				// notify any listeners
				this.el!.emit(Event.HeightScale, scale);
			}
		},

		update() {
			const bounds = this.boundingBox;

			if (bounds) {
				this.scaleToHeight(bounds);
			}
		}
	});
}
