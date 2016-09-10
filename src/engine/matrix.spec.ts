import {
  rotateMatrixLeft,
  rotateMatrixRight,
  transpose,
} from './matrix';

describe('matrix functions', () => {
  describe('rotateLeft function', () => {
    it('should handle an empty array case', () => {
      expect(rotateMatrixLeft([])).toEqual([]);
    });
    
    it('should handle an array of empty array case', () => {
      expect(rotateMatrixLeft([[], []])).toEqual([]);
    });

    it('should rotate a simple 3x2 array', () => {
      expect(rotateMatrixLeft([
        [0, 1],
        [1, 0],
        [0, 1],
      ])).toEqual([
        [0, 1, 0],
        [1, 0, 1],
      ]);
    });
    
    it('two rotations should produce the inverse of the original', () => {
      expect(rotateMatrixLeft(rotateMatrixLeft([
        [0, 1],
        [1, 0],
        [0, 1],
      ]))).toEqual([
        [1, 0],
        [0, 1],
        [1, 0],
      ]);
    });

    it('should *not* mutate the original object', () => {
      const matrix = [
        [0, 1],
        [1, 0],
        [0, 1],
      ];
      const rotated = rotateMatrixLeft(matrix);
      expect(rotated).not.toBe(matrix);
      expect(rotated[0]).not.toBe(matrix[0]);
    });
  });

  describe('rotateMatrixRight function', () => {
    it('should handle an empty array case', () => {
      expect(rotateMatrixRight([])).toEqual([]);
    });

    it('should handle an array of empty array case', () => {
      expect(rotateMatrixRight([[], []])).toEqual([]);
    });

    it('should rotate a simple 3x2 array', () => {
      expect(rotateMatrixRight([
        [0, 1],
        [1, 0],
        [0, 1],
      ])).toEqual([
        [1, 0, 1],
        [0, 1, 0],
      ]);
    });
    
    it('two rotations should produce the inverse of the original', () => {
      expect(rotateMatrixRight(rotateMatrixRight([
        [0, 1],
        [1, 0],
        [0, 1],
      ]))).toEqual([
        [1, 0],
        [0, 1],
        [1, 0],
      ]);
    });

    it('should *not* mutate the original object', () => {
      const matrix = [
        [0, 1],
        [1, 0],
        [0, 1],
      ];
      const rotated = rotateMatrixRight(matrix);
      expect(rotated).not.toBe(matrix);
      expect(rotated[0]).not.toBe(matrix[0]);
    });
  });

  describe('transpose function', () => {
    it('should ignore empty arrays', () => {
      expect(transpose([])).toEqual([]);
    });
    
    it('should ignore empty arrays that contain empty arrays', () => {
      expect(transpose([[], []])).toEqual([]);
    });

    it('should swap x/y for a simple 3x3 array', () => {
      expect(transpose([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });
  });
});
