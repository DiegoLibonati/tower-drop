import { Block } from "@src/entities/app";

export type GameState = {
  gameStarted: boolean;
  isMovingForward: boolean;
  blocks: Block[];
  fallBlocks: Block[];
};
