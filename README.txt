Sokoban Solver
-------------------------------

To run the web app, follow the steps below:
1. Ensure that you have the latest version of Node and yarn or npm.
2. Navigate to `_bundle` folder. This folder contains the backend (solver) and the production build.
3. Install all the dependencies by running `npm install` or `yarn install`.
4. Run the web app with `npm start` or `yarn start`. Open your browser to `http://localhost:8000/`.
5. If you need test cases, you can use the *.in files from `puzzles`.

NOTE: Since the frontend is served with a server, the frontend files are bundled for production in order. To view the source code, navigate to the `client` folder instead.

Troubleshooting:
If running `npm start` executes with errors, try running `node ./build/main.js` at the root of the `_bundle` folder.
