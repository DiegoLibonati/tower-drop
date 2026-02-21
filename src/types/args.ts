import type { Coords, Sizes, Direction } from "@/types/app";

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
