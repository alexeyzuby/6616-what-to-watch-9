import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {checkAuthAction, fetchFilmsAction, fetchPromoFilmAction} from './store/api-actions';
import browserHistory from './browser-history';
import HistoryRouter from './components/history-route/history-route';
import App from './components/app/app';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={browserHistory}>
      <Provider store={store}>
        <ToastContainer/>
        <App/>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
