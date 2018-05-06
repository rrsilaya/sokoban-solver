/*
 *  Methods for mutating state
*/
import { direction, Character } from './constants';
import { peek, getPosition, replaceCharAt } from './utils';

export const moveCharacter = (state, direction) => {
  /* Update path */
  state.path += direction;

  /* No need to check if possible move since it will be checked in getPossibleMoves. */
  const { adjacent, location } = peek(state, direction);
  const current_character = state.board[getPosition(state.location)];

  /* Again, no need to check since the list contains possible movements. */
  if (adjacent === Character.BOX || adjacent === Character.BOX_ON) {
    /* Player tries to push box. */
    const { adjacent: adj_skip, location: loc_skip } = peek(state, direction, 2);

    /* Box Move */
    state.board = replaceCharAt(
      state.board,
      getPosition(loc_skip),
      adj_skip === Character.DOT ?
        Character.BOX_ON  // box moved to dot
        : Character.BOX   // box moved to empty floor
    );

    /* Box Leave + Player Move */
    state.board = replaceCharAt(
      state.board,
      getPosition(location),
      adjacent === Character.BOX_ON ?
        Character.WORKER_ON // moved on top of dot
        : Character.WORKER  // moved in ordinary floor
    );
  } else {
    state.board = replaceCharAt(
      state.board,
      getPosition(location),
      adjacent === Character.DOT ?
        Character.WORKER_ON // worker at top of dot
        : Character.WORKER  // ordinary worker
    );
  }

  /* On Player Leave */
  state.board = replaceCharAt(
    state.board,
    getPosition(state.location),
    current_character === Character.WORKER_ON ?
    Character.DOT      // character is previously standing on top of dot
    : Character.EMPTY  // leaves an empty floor
  );

  state.location = location;
  return state;
}