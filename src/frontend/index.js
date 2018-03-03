import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import moment from 'moment';
import {extendMoment} from 'moment-range';

extendMoment(moment);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
