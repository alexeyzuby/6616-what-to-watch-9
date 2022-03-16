import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {films} from './mocks/films';
import App from './components/app/app';

const promoFilm = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promo={promoFilm} films={films}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
