export type BooleanFunction = (...args: any[]) => boolean;

export interface Dictionary<T> {
  [id: string]: T;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export type SeedRandom = (seed: string, ...args: any[]) => () => number;

export type SignedTypedArray = Int8Array | Int16Array | Int32Array;
export type UnsignedTypedArray = Uint8Array | Uint16Array | Uint32Array;
export type TypedArray = UnsignedTypedArray | SignedTypedArray;
