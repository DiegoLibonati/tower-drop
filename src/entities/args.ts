import { Coords, Sizes, Direction } from "@src/entities/app";

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
