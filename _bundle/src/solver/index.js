import { GAME_BOARD, Character, direction } from './constants';
import { locateCharacter, getPossibleMoves, printStats, printBoard } from './utils';
import { moveCharacter } from './setters';

export const bfs_search = async board => {
  return new Promise((resolve, reject) => {
    if (!board || board.length !== 100) return reject(500);

    const initialState = {
      board: board,
      path: '',
      location: locateCharacter(board)
    };

    const frontier = [ initialState ];
    const explored = [];
    
    while (frontier.length) {
      const currentState = frontier.shift();
      explored.push(currentState.board);

      if (!currentState.board.includes(Character.BOX)) return resolve({ path: currentState.path, nodes: explored.length });
      else {
        getPossibleMoves(currentState).forEach(move => {
          let newState = { ...currentState };
          newState = moveCharacter(newState, move);

          if (!explored.includes(newState.board)) {
            frontier.push(newState);
          }
        });
      }
    }
  });
};

export const dfs_search = async board => {
  return new Promise((resolve, reject) => {
    if (!board || board.length !== 100) return reject(500);

    const initialState = {
      board: board,
      path: '',
      location: locateCharacter(board)
    };

    const frontier = [ initialState ];
    const explored = [];
    
    while (frontier.length) {
      const currentState = frontier.pop();
      explored.push(currentState.board);

      if (!currentState.board.includes(Character.BOX)) return resolve({ path: currentState.path, nodes: explored.length });
      else {
        getPossibleMoves(currentState).forEach(move => {
          let newState = { ...currentState };
          newState = moveCharacter(newState, move);

          if (!explored.includes(newState.board)) {
            frontier.push(newState);
          }
        });
      }
    }
  });
};