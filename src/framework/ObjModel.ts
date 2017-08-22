import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import MetaBase from "@dojo/widget-core/meta/Base";
import * as THREE from "three"
import { Box3 } from 'three';

export interface AssetProperties extends WidgetProperties {
	mtl: string;
	position?: string;
	scale?: string;
	src: string;
}

export class EntityMeta extends MetaBase {
	boundingBox(key: string): Box3 {
		this.requireNode(key);
		const node = this.nodes.get(key);

		if (!node) {
			return new Box3();
		}

		return new THREE.Box3().setFromObject( (<any> node).object3D );
	}
}

export default class ObjModel<T extends AssetProperties> extends WidgetBase<T> {
	protected render(): DNode {
		const {
			mtl,
			position = '0 0 0',
			scale = '1 1 1',
			src,
		} = this.properties;

		return v('a-obj-model', {
			key: 'root',
			mtl,
			position,
			scale,
			src,
			onobject3dset: () => {
				const meta = this.meta(EntityMeta);
				console.log(meta.boundingBox('root'));
			}
		});
	}
}
