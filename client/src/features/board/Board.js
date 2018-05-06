import React, { Component } from 'react';
import { BeatLoader } from 'halogenium';
import { Stage, Layer, Image, Group } from 'react-konva';

import graphics from '../../assets/characters'

class Board extends Component {
  constructor() {
    super();
    this.state = {
      filename: ''
    }
  }

  handleFileChange = e => {
    this.props.loadPuzzle(e.target.files);
    this.setState({ filename: e.target.files[0].name });
  }

  render() {
    const { toggleSolver, isSolving, board } = this.props;

    return (
      <div className="panel board">
        <div className="tools">
          <input
            type="file"
            id="file-input"
            accept=".in"
            onChange={this.handleFileChange}
            disabled={isSolving}
          />
          <label htmlFor="file-input">
            <i className="text-secondary">attachment</i>
            <span>{ this.state.filename || 'Load puzzle...' }</span>
          </label>
          <button className="primary" onClick={toggleSolver}>
            <span>Toggle Solver</span>
            <i>chevron_right</i>
          </button>
        </div>
        <div className="game">
          <div className="inline">
            { isSolving && <div className="loader"><BeatLoader /></div> }
            <Stage width={500} height={500}>
              <Layer>
                {
                  board.map((row, i) => (
                    <Group key={i}>
                      {
                        row.map((cell, j) => (
                          <Image key={j} image={cell.graphics} x={j * 50} y={i * 50} />
                        ))
                      }
                    </Group>
                  ))
                }
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;