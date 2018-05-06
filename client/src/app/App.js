import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Board from '../features/board/Board';
import Solver from '../features/solver/Solver';

import { toggleSolver, handlePress, loadPuzzle, moveIndex, changeMethod, solveState } from './actions';
import { moveCharacter } from './sokoban';

class App extends Component {
  constructor() {
    super();
    this.state = {
      solver: false,
      board: [],
      location: {},
      boxes: 0,
      isSolving: false,

      solution: {
        path: '',
        index: 0,
        nodes: null,
        duration: null
      },
      method: 'bfs'
    };

    this.toggleSolver = toggleSolver.bind(this);
    this.handlePress = handlePress.bind(this);
    this.loadPuzzle = loadPuzzle.bind(this);
    this.moveIndex = moveIndex.bind(this);
    this.changeMethod = changeMethod.bind(this);
    this.solveState = solveState.bind(this);
    this.moveCharacter = moveCharacter.bind(this);
  }

  render() {
    return (
      <CSSTransitionGroup
        component="div"
        className="wrapper"
        transitionName="wrapper"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        tabIndex="0"
        onKeyDown={this.handlePress}>
        <Board
          toggleSolver={this.toggleSolver}
          loadPuzzle={this.loadPuzzle}
          isSolving={this.state.isSolving}
          board={this.state.board}
        />
        {this.state.solver && (
          <Solver
            solution={this.state.solution}
            moveIndex={this.moveIndex}
            method={this.state.method}
            changeMethod={this.changeMethod}
            isSolving={this.state.isSolving}
            hasLoadedFile={!!this.state.board.length}
            solveState={this.solveState}
            boxes={this.state.boxes}
          />
        )}
      </CSSTransitionGroup>
    );
  }
}

export default App;
