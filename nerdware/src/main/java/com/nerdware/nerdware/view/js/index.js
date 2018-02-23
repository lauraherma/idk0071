import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import App from '../../src/main/java/com/nerdware/view/js/App.js';
import registerServiceWorker from '../../src/main/java/com/nerdware/nerdware/view/js/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
