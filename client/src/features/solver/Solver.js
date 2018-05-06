import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { direction } from '../../app/constants';

class Solver extends Component {
  showPathDirection = dir => {
    switch (dir) {
      case direction.UP:
        return 'Up';
      case direction.DOWN:
        return 'Down';
      case direction.LEFT:
        return 'Left';
      case direction.RIGHT:
        return 'Right';
    }
  };

  handleMethodChange = e => {
    this.props.changeMethod(e.target.value);
  };

  render() {
    const { path, index, nodes, duration } = this.props.solution;
    const { method, isSolving, hasLoadedFile, solveState, boxes } = this.props;

    return (
      <div className="panel solver">
        <div className="pane">
          <div className="selector">
            <input
              id="bfs"
              type="radio"
              name="algorithm"
              value="bfs"
              checked={method === 'bfs'}
              onChange={this.handleMethodChange}
            />
            <label htmlFor="bfs">BFS</label>
            <input
              id="dfs"
              type="radio"
              name="algorithm"
              value="dfs"
              checked={method === 'dfs'}
              onChange={this.handleMethodChange}
            />
            <label htmlFor="dfs">DFS</label>
          </div>
          <div className="directions">
            <i className={path[index] === direction.UP ? 'active' : ''}>arrow_upward</i>
            <div>
              <i className={`side ${path[index] === direction.LEFT && 'active'}`}>arrow_upward</i>
              <i className={`side ${path[index] === direction.RIGHT && 'active'}`}>
                arrow_downward
              </i>
            </div>
            <i className={path[index] === direction.DOWN ? 'active' : ''}>arrow_downward</i>
            <div className="arrow-direction">
              <button
                className="arrow"
                onClick={() => this.props.moveIndex(true)}
                disabled={index === 0}>
                <i>chevron_left</i>
              </button>
              <CSSTransitionGroup
                className="instruction"
                component="div"
                transitionName="directionName"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                <span key={index}>{this.showPathDirection(path[index])}</span>
              </CSSTransitionGroup>
              <button
                className="arrow"
                onClick={() => this.props.moveIndex(false)}
                disabled={index + 1 >= path.length}>
                <i>chevron_right</i>
              </button>
            </div>
          </div>
          <div className="statistics">
            {duration ? (
              <span>
                Solved in <span className="highlight">{duration} seconds</span> with{' '}
                <span className="highlight">{nodes}</span> nodes
              </span>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
          <div>
            <button className="primary" disabled={isSolving || !boxes || !hasLoadedFile} onClick={solveState}>
              { isSolving ? 'Solving Current State' : 'Solve Current State'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Solver;
