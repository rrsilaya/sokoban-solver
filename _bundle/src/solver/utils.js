/*
 *  Utility Methods
*/

import {
  Character,
  direction
} from './constants';

export const getPosition = ({ x, y }) => (y * 10) + x;
export const getIndex = index => ({ x: position % 10, y: Math.ceil(position / 10) - 1 });

export const locateCharacter = board => {
  const position = board.indexOf(Character.WORKER) || board.indexOf(Character.WORKER_ON);

  return {
    x: position % 10,
    y: Math.ceil(position / 10) - 1
  }
}

export const peek = (state, dir, pad = 1) => {
  const index = { ...state.location };

  switch (dir) {
    case direction.UP:
      index.y -= pad;
      break;

    case direction.RIGHT:
      index.x += pad;
      break;

    case direction.DOWN:
      index.y += pad;
      break;

    case direction.LEFT:
      index.x -= pad;
      break;
  }

  return ({
    adjacent: state.board[getPosition(index)],
    location: index
  });
}

export const getPossibleMoves = (state) => {
  const moves = [
    direction.UP,
    direction.RIGHT,
    direction.DOWN,
    direction.LEFT
  ];

  const possibility = moves.map(move => {
    let { adjacent } = peek(state, move);

    if (adjacent === Character.BOX || adjacent === Character.BOX_ON) {
      adjacent = peek(state, move, 2).adjacent; // reassign adjacent cell to the skipped cell
    }

    if (!adjacent || adjacent === Character.WALL || adjacent === Character.BOX || adjacent === Character.BOX_ON) return false;
    else return true;
  })

  return moves.filter((move, i) => possibility[i]);
}

export const replaceCharAt = (board, index, character) => board.substr(0, index) + character + board.substr(index + 1);

export const printBoard = board => {
  for (let row = 0; row < 10; row++) {
    let r = '';

    for (let column = 0; column < 10; column++) {
      const char = board[getPosition({ x: column, y: row })];
      let des = '';

      if (char === Character.WORKER || char === Character.WORKER_ON) des = '\x1b[31;1m';
      else if (char === Character.WALL) des = '\x1b[42m';

      r += `${des}${char} \x1b[0m`;
    }

    console.log(r);
  }

  console.log('\n');
}

export const printStats = (state, nodes, frontier) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`[${nodes.toString().padStart(10, ' ')}]\t${state.path}\t(${state.path.length})\t${frontier.length}\t${JSON.stringify(state.location)}`);
}