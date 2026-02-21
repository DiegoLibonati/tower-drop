export interface Sizes {
  width: number;
  height: number;
  depth?: number;
}

export type Coords = Partial<{
  x: number;
  y: number;
  z: number;
}>;

export type Direction = "x" | "y" | "z";

export interface Block {
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  body: CANNON.Body;
  sizes: Sizes;
  direction?: Direction;
}
