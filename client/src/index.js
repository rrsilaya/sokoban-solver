import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

import './assets/fonts/lineto-font.css';
import './assets/fonts/material-design-icons.css';
import './index.css';
import './assets/stylesheets/styles.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();