export type Sizes = {
  width: number;
  height: number;
  depth?: number;
};

export type Coords = Partial<{
  x: number;
  y: number;
  z: number;
}>;

export type Direction = "x" | "y" | "z";

export type Block = {
  mesh: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshLambertMaterial,
    THREE.Object3DEventMap
  >;
  body: CANNON.Body;
  sizes: Sizes;
  direction?: Direction;
};
