import React from 'react';
import ReactDOM from 'react-dom';
import RestaurantApp from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<RestaurantApp />, document.getElementById('root'));

serviceWorker.unregister();