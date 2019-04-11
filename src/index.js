import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
