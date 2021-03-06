///Modified index to force the pr
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/App/app.js';
import Firebase, { FirebaseContext } from './components/Firebase';


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
);

// ReactDOM.render(
//   <App />,  document.getElementById('root')
// )
serviceWorker.unregister();
