import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import * as THREE from "three";
import { Box3 } from "three";

export interface AssetProperties extends WidgetProperties {
	mtl: string;
	position?: string;
	scale?: string;
	src: string;
}

export default class ObjModel<T extends AssetProperties> extends WidgetBase<T> {
	get domNode(): any {
		return document.querySelector('a-obj-model');
	}

	public boundingBox(): Box3 {
		return new THREE.Box3().setFromObject( this.domNode.object3D );
	}

	protected render(): DNode {
		const {
			mtl,
			position = '0 0 0',
			scale = '1 1 1',
			src,
		} = this.properties;
		return v('a-obj-model', {
			mtl,
			position,
			scale,
			src
		});
	}
}
