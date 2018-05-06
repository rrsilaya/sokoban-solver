import Avatar from '../assets/characters';

export const arrow = {
  RIGHT: 39,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
}

export const key = {
  UP: 87,
  DOWN: 83,
  RIGHT: 68,
  LEFT: 65
}

export const direction = {
  UP: 'U',
  DOWN: 'D',
  LEFT: 'L',
  RIGHT: 'R'
}

export const element = {
  WORKER: { type: 'k', graphics: Avatar.player },
  WORKER_DOT: { type: 'K', graphics: Avatar.player },
  WALL: { type: 'w', graphics: Avatar.wall },
  BOX: { type: 'b', graphics: Avatar.box },
  BOX_DOT: { type: 'B', graphics: Avatar.box_dot },
  EMPTY: { type: 'e' },
  DOT: { type: 's', graphics: Avatar.dot },
  NONE: { type: 'x' }
}