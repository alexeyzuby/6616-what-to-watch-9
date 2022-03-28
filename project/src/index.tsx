import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import {store} from './store';
import {checkAuthAction, fetchFilmsAction} from './store/api-actions';
import App from './components/app/app';

import 'react-toastify/dist/ReactToastify.css';

const promoFilm = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App promo={promoFilm}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
