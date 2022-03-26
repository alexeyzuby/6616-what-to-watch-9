import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchFilmsAction} from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import App from './components/app/app';

const promoFilm = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

store.dispatch(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App promo={promoFilm}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
