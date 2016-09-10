import { CHANGE_NEXT_CONFIG, REPLACE_NEXT_CONFIG } from '../constants';
import { GameConfig } from '../../engine';
import { deepFreeze } from '../../util';

const INIT = deepFreeze({
  debug: true,
  preview: 3,
  seed: 'hello-world',
});

export function nextConfig(state: GameConfig = INIT, { payload, meta, type }) {
  switch (type) {
    case CHANGE_NEXT_CONFIG:
      const updated = {};
      updated[meta] = payload;
      return Object.assign({}, state, updated);

    case REPLACE_NEXT_CONFIG:
      return Object.assign({}, state, payload);

    default:
      return state;
  }
}
