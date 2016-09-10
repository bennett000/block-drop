import { Matrix } from './matrix';
import { Block } from './block';
import { Board } from './board';

export type RandomMethod = 'randomFromSet' | 'random';

export interface BlockDescription {
  desc: Matrix;
  name?: string;
}

export interface MapBaseConfig {
  width?: number;
  height?: number;
  depth?: number;
}

export interface NextBlockConfig extends MapBaseConfig {
  blockDescriptions?: BlockDescription[];
  createBlock?: (desc: Matrix, x?: number, y?: number, name?: string) => Block;
  preview?: number;
  seedRandom?: string;
  randomMethod?: RandomMethod;
  seed?: string;
  spawn?: (boardWidth: number,
           boardHeight: number,
           block: Block) => Block;
}

export interface GameConfig extends NextBlockConfig {
  board?: Uint8Array;
  debug?: boolean;
  canRotateLeft?: (board: Board, block: Block) => boolean;
  canRotateRight?: (board: Board, block: Block) => boolean;
  checkForLoss?: (board: Board, block: Block) => boolean;
  createBoard?: (width: number, height: number) => Board;
  detectAndClear?: string;
  forceBufferUpdateOnClear?: boolean;
  name?: string;
  speed?: number;
  tick?: (engine,
          board: Board,
          moveBlock: (axis: 'x' | 'y', magnitude: number) => any,
          newBlock: () => any,
          clearCheck: () => any,
          commitBlock: () => any,
          checkForLoss: () => boolean,
          gameOver: (engine?: any, board?: Board) => any,
          fnOnBlock: (fn: () => any) => any) =>  any;
}

