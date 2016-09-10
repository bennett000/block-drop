import { TypedArray } from '../../interfaces';
import { Block, GameConfig } from '../../engine';
import {
  CHANGE_NEXT_CONFIG,
  PAUSE,
  REPLACE_CONFIG,
  REPLACE_NEXT_CONFIG,
  RESUME,
  UPDATE_ACTIVE_PIECE,
  UPDATE_BUFFER,
  UPDATE_PREVIEW,
} from '../constants';

export function replaceConfig(config: GameConfig) {
  return {
    type: REPLACE_CONFIG,
    payload: config,
  };
}

export function nextConfigProp(prop: string, value: number | string) {
  return {
    type: CHANGE_NEXT_CONFIG,
    payload: value,
    meta: prop,
  };
}

export function pause() {
  return {
    type: PAUSE,
    payload: true,
  };
}

export function replaceNextConfig(config: GameConfig) {
  return {
    type: REPLACE_NEXT_CONFIG,
    payload: config,
  };
}

export function resume() {
  return {
    type: RESUME,
    payload: false,
  };
}

export function updateActivePiece(piece: Block) {
  return {
    type: UPDATE_ACTIVE_PIECE,
    payload: piece,
  };
}

export function updateBuffer(buffer: TypedArray) {
  return {
    type: UPDATE_BUFFER,
    payload: buffer,
  };
}

export function updatePreview(preview: Block[]) {
  return {
    type: UPDATE_PREVIEW,
    payload: preview,
  };
}
