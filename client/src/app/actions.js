import axios from 'axios';
import { arrow, key, element, direction } from './constants';

export function toggleSolver() {
  this.setState({ solver: !this.state.solver });
}

export function handlePress({ keyCode }) {
  if (this.state.boxes) {
    if (keyCode === arrow.UP || keyCode === key.UP) {
      this.moveCharacter(direction.UP);
    } else if (keyCode === arrow.RIGHT || keyCode === key.RIGHT) {
      this.moveCharacter(direction.RIGHT);
    } else if (keyCode === arrow.LEFT || keyCode === key.LEFT) {
      this.moveCharacter(direction.LEFT);
    } else if (keyCode === arrow.DOWN || keyCode === key.DOWN) {
      this.moveCharacter(direction.DOWN);
    }
  }
}

export function loadPuzzle(file) {
  const reader = new FileReader();

  reader.readAsText(new Blob(file));
  reader.onload = () => {
    const file = reader.result;
    const board = [];
    const location = {};
    let boxes = 0;

    if (file.length === 200) {
      for (let line = 0; line < 10; line++) {
        const row = [];

        for (let char = 0; char < 19; char += 2) {
          switch (file[(line * 20) + char]) {
            case element.WORKER.type:
              row.push(element.WORKER);
              location.x = char / 2;
              location.y = line;
              break;
            case element.WORKER_DOT.type:
              row.push(element.WORKER_DOT);
              location.x = char / 2;
              location.y = line;
              break;
            case element.WALL.type:
              row.push(element.WALL);
              break;
            case element.BOX.type:
              row.push(element.BOX);
              boxes++;
              break;
            case element.BOX_DOT.type:
              row.push(element.BOX_DOT);
              break;
            case element.EMPTY.type:
              row.push(element.EMPTY);
              break;
            case element.DOT.type:
              row.push(element.DOT);
              break;
            case element.NONE.type:
              row.push(element.NONE);
              break;
          }
        }

        board.push(row);
      }

      this.setState({ board, boxes, location });
    } else alert('Invalid input puzzle.');
  }
}

export function moveIndex(isPrevious) {
  let index = isPrevious ? this.state.solution.index - 1 : this.state.solution.index + 1;

  if (index >= this.state.solution.path.length) index = this.state.solution.index;

  this.setState({
    solution: {
      ...this.state.solution,
      index
    }
  });
}

export function changeMethod(method) {
  this.setState({ method });
}

export function solveState() {
  const { board, method } = this.state;

  this.setState({ isSolving: true }, () => {
    const flat_board = board.map(row => row.map(cell => cell.type).join('')).join('');
    axios.post(`/api/${method}`, { board: flat_board })
      .then(res => {
        const { solution, nodes, duration } = res.data.data;

        this.setState({
          isSolving: false,
          solution: {
            path: solution,
            nodes,
            duration,
            index: 0
          }
        });
      })
      .catch(() => {
        alert('An error occured connecting to server');
        this.setState({ isSolving: false });
      });
  });
}