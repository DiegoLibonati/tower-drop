import type { Block } from "@/types/app";

export interface GameState {
  gameStarted: boolean;
  isMovingForward: boolean;
  blocks: Block[];
  fallBlocks: Block[];
}
