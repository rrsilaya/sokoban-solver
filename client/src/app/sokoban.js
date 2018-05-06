import { direction, element as Character } from './constants';

const peek = ({ location, board }, dir, pad = 1) => {
  const loc = { ...location };

  switch (dir) {
    case direction.UP:
      loc.y -= pad;
      break;
    case direction.RIGHT:
      loc.x += pad;
      break;
    case direction.DOWN:
      loc.y += pad;
      break;
    case direction.LEFT:
      loc.x -= pad;
      break;
  }

  const adjacent = board[loc.y][loc.x].type;
  return { adjacent, location: loc };
};

export function moveCharacter(dir) {
  const { board } = this.state;
  Object.freeze(this.state.location);

  let boxes = this.state.boxes;

  /* Get the current character. Maybe w or W. */
  const current_character = board[this.state.location.y][this.state.location.x];
  const { adjacent, location } = peek(this.state, dir);

  if (adjacent === Character.BOX.type || adjacent === Character.BOX_DOT.type) {
    /* Player tries to push a box. */
    const { adjacent: adj_skip, location: loc_skip } = peek(this.state, dir, 2);

    if (
      adj_skip === Character.WALL.type ||
      adj_skip === Character.BOX.type ||
      adj_skip === Character.BOX_DOT.type
    )
      return;

    /* Box Move */
    if (adj_skip === Character.DOT.type) {
      board[loc_skip.y][loc_skip.x] = Character.BOX_DOT;
      boxes--;

      if (!boxes) alert('Congratulations!');
    } else board[loc_skip.y][loc_skip.x] = Character.BOX;

    /* Box Leave */
    if (adjacent === Character.BOX_DOT.type) {
      board[location.y][location.x] = Character.WORKER_DOT;
      boxes++;
    } else board[location.y][location.x] = Character.WORKER;
  } else {
    if (adjacent === Character.WALL.type) return;

    if (adjacent === Character.DOT.type) board[location.y][location.x] = Character.WORKER_DOT;
    else board[location.y][location.x] = Character.WORKER;
  }

  /* On Player Leave */
  if (current_character.type === Character.WORKER_DOT.type)
    board[this.state.location.y][this.state.location.x] = Character.DOT;
  else board[this.state.location.y][this.state.location.x] = Character.EMPTY;

  this.setState({ location, board, boxes });
}
