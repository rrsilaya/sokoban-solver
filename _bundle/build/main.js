require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 *  Constants
*/

// export const GAME_BOARD = 'wwwwwwwwwwwswwwwwwswweweewwwewweebeeeebwweeswkeeewweeewwbeewwebebeseewwebeeeewewwsweeeewswwwwwwwwwww';
const GAME_BOARD = 'wwwwwxxxxxwkewwxxxxxwsbBewxxxxweeewwxxxxweeeewxxxxwwwwwwxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
/* unused harmony export GAME_BOARD */

// export const GAME_BOARD = 'wwwwwxxxxxwseewxxxxxwbeewxxxxxweeewxxxxxwbkewxxxxxweeewxxxxxwebewxxxxxwssewxxxxxwwwwwxxxxxxxxxxxxxxx';

const max_size = {
  x: 10, y: 10
};
/* unused harmony export max_size */


const Character = {
  WORKER: 'k',
  WORKER_ON: 'K',
  WALL: 'w',
  BOX: 'b',
  BOX_ON: 'B',
  EMPTY: 'e',
  DOT: 's',
  NONE: 'x'
};
/* harmony export (immutable) */ __webpack_exports__["a"] = Character;


const direction = {
  LEFT: 'L',
  UP: 'U',
  DOWN: 'D',
  RIGHT: 'R'
};
/* harmony export (immutable) */ __webpack_exports__["b"] = direction;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/*
 *  Utility Methods
*/



const getPosition = ({ x, y }) => y * 10 + x;
/* harmony export (immutable) */ __webpack_exports__["a"] = getPosition;

const getIndex = index => ({ x: position % 10, y: Math.ceil(position / 10) - 1 });
/* unused harmony export getIndex */


const locateCharacter = board => {
  const position = board.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER) || board.indexOf(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER_ON);

  return {
    x: position % 10,
    y: Math.ceil(position / 10) - 1
  };
};
/* harmony export (immutable) */ __webpack_exports__["c"] = locateCharacter;


const peek = (state, dir, pad = 1) => {
  const index = Object.assign({}, state.location);

  switch (dir) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].UP:
      index.y -= pad;
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].RIGHT:
      index.x += pad;
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].DOWN:
      index.y += pad;
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].LEFT:
      index.x -= pad;
      break;
  }

  return {
    adjacent: state.board[getPosition(index)],
    location: index
  };
};
/* harmony export (immutable) */ __webpack_exports__["d"] = peek;


const getPossibleMoves = state => {
  const moves = [__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].UP, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].RIGHT, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].DOWN, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* direction */].LEFT];

  const possibility = moves.map(move => {
    let { adjacent } = peek(state, move);

    if (adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX || adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX_ON) {
      adjacent = peek(state, move, 2).adjacent; // reassign adjacent cell to the skipped cell
    }

    if (!adjacent || adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WALL || adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX || adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX_ON) return false;else return true;
  });

  return moves.filter((move, i) => possibility[i]);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = getPossibleMoves;


const replaceCharAt = (board, index, character) => board.substr(0, index) + character + board.substr(index + 1);
/* harmony export (immutable) */ __webpack_exports__["e"] = replaceCharAt;


const printBoard = board => {
  for (let row = 0; row < 10; row++) {
    let r = '';

    for (let column = 0; column < 10; column++) {
      const char = board[getPosition({ x: column, y: row })];
      let des = '';

      if (char === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER || char === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER_ON) des = '\x1b[31;1m';else if (char === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WALL) des = '\x1b[42m';

      r += `${des}${char} \x1b[0m`;
    }

    console.log(r);
  }

  console.log('\n');
};
/* unused harmony export printBoard */


const printStats = (state, nodes, frontier) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`[${nodes.toString().padStart(10, ' ')}]\t${state.path}\t(${state.path.length})\t${frontier.length}\t${JSON.stringify(state.location)}`);
};
/* unused harmony export printStats */


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_morgan___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_morgan__);





const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();

app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_1_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_morgan___default()('dev'));

app.use('/', __WEBPACK_IMPORTED_MODULE_0_express___default.a.static(__dirname + '/../public/'));
app.use(__WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */]);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

/* harmony default export */ __webpack_exports__["default"] = (server);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "src"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__solver__ = __webpack_require__(7);



const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.post('/api/bfs', async (req, res) => {
  try {
    const time_start = new Date();
    const solution = await Object(__WEBPACK_IMPORTED_MODULE_1__solver__["a" /* bfs_search */])(req.body.board);

    res.status(200).json({
      status: 200,
      message: 'Successfully solved sokoban problem',
      data: {
        solution: solution.path,
        duration: (new Date() - time_start) / 1000,
        nodes: solution.nodes
      }
    });
  } catch (status) {
    res.status(status).json({ status, message: 'Internal server error while trying to solve using BFS.' });
  }
});

router.post('/api/dfs', async (req, res) => {
  try {
    const time_start = new Date();
    const solution = await Object(__WEBPACK_IMPORTED_MODULE_1__solver__["b" /* dfs_search */])(req.body.board);

    res.status(200).json({
      status: 200,
      message: 'Successfully solved sokoban problem',
      data: {
        solution: solution.path,
        duration: (new Date() - time_start) / 1000,
        nodes: solution.nodes
      }
    });
  } catch (status) {
    res.status(status).json({ status, message: 'Internal server error while trying to solve using DFS.' });
  }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setters__ = __webpack_require__(8);




const bfs_search = async board => {
  return new Promise((resolve, reject) => {
    if (!board || board.length !== 100) return reject(500);

    const initialState = {
      board: board,
      path: '',
      location: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* locateCharacter */])(board)
    };

    const frontier = [initialState];
    const explored = [];

    while (frontier.length) {
      const currentState = frontier.shift();
      explored.push(currentState.board);

      if (!currentState.board.includes(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX)) return resolve({ path: currentState.path, nodes: explored.length });else {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getPossibleMoves */])(currentState).forEach(move => {
          let newState = Object.assign({}, currentState);
          newState = Object(__WEBPACK_IMPORTED_MODULE_2__setters__["a" /* moveCharacter */])(newState, move);

          if (!explored.includes(newState.board)) {
            frontier.push(newState);
          }
        });
      }
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bfs_search;


const dfs_search = async board => {
  return new Promise((resolve, reject) => {
    if (!board || board.length !== 100) return reject(500);

    const initialState = {
      board: board,
      path: '',
      location: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* locateCharacter */])(board)
    };

    const frontier = [initialState];
    const explored = [];

    while (frontier.length) {
      const currentState = frontier.pop();
      explored.push(currentState.board);

      if (!currentState.board.includes(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX)) return resolve({ path: currentState.path, nodes: explored.length });else {
        Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getPossibleMoves */])(currentState).forEach(move => {
          let newState = Object.assign({}, currentState);
          newState = Object(__WEBPACK_IMPORTED_MODULE_2__setters__["a" /* moveCharacter */])(newState, move);

          if (!explored.includes(newState.board)) {
            frontier.push(newState);
          }
        });
      }
    }
  });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = dfs_search;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(2);
/*
 *  Methods for mutating state
*/



const moveCharacter = (state, direction) => {
  /* Update path */
  state.path += direction;

  /* No need to check if possible move since it will be checked in getPossibleMoves. */
  const { adjacent, location } = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* peek */])(state, direction);
  const current_character = state.board[Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPosition */])(state.location)];

  /* Again, no need to check since the list contains possible movements. */
  if (adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX || adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX_ON) {
    /* Player tries to push box. */
    const { adjacent: adj_skip, location: loc_skip } = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* peek */])(state, direction, 2);

    /* Box Move */
    state.board = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* replaceCharAt */])(state.board, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPosition */])(loc_skip), adj_skip === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].DOT ? __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX_ON // box moved to dot
    : __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX // box moved to empty floor
    );

    /* Box Leave + Player Move */
    state.board = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* replaceCharAt */])(state.board, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPosition */])(location), adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].BOX_ON ? __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER_ON // moved on top of dot
    : __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER // moved in ordinary floor
    );
  } else {
    state.board = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* replaceCharAt */])(state.board, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPosition */])(location), adjacent === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].DOT ? __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER_ON // worker at top of dot
    : __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER // ordinary worker
    );
  }

  /* On Player Leave */
  state.board = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* replaceCharAt */])(state.board, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* getPosition */])(state.location), current_character === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].WORKER_ON ? __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].DOT // character is previously standing on top of dot
  : __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* Character */].EMPTY // leaves an empty floor
  );

  state.location = location;
  return state;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = moveCharacter;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map