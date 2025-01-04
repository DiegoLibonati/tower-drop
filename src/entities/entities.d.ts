// New

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

export type GameState = {
  gameStarted: boolean;
  isMovingForward: boolean;
  blocks: Block[];
  fallBlocks: Block[];
};

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

// Args

export interface AddBlockArgs {
  coords: Coords;
  sizes: Sizes;
  direction: Direction;
}

export interface CreateBlockArgs {
  coords: Coords;
  sizes: Sizes;
  isBlockFalling: boolean;
}

export interface AddFallBlockArgs {
  coords: Coords;
  sizes: Sizes;
}
