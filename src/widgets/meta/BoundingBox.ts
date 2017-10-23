import MetaBase from "@dojo/widget-core/meta/Base";
import * as THREE from "three"
import { Box3 } from 'three';

export class BoundingBox extends MetaBase {
	boundingBox(key: string): Box3 {
		const node = this.getNode(key);

		if (!node) {
			return new Box3();
		}

		return new THREE.Box3().setFromObject( (<any> node).object3D );
	}
}
