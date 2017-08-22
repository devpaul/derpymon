import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { v } from '@dojo/widget-core/d';
import MetaBase from "@dojo/widget-core/meta/Base";
import * as THREE from "three"
import { Box3 } from 'three';

export interface ObjMetadata {
	boundingBox: Box3;
}

export interface AssetProperties extends WidgetProperties {
	mtl: string;
	src: string;
	objMetadata: Map<string, ObjMetadata>;
	[ key: string ]: any;
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
	protected getProperties() {
		return Object.assign({}, this.properties);
	}

	protected render(): DNode {
		const props = this.getProperties();

		return v('a-obj-model', props);
	}
}
