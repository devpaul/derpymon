/**
 * OBJ model definition consists of an obj file (or inline path) and an optional mtl material file
 */
export interface ObjModelAsset {
	mtl?: string;
	obj: string;
}
