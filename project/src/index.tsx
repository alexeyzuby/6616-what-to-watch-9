import React from 'react';
import ReactDOM from 'react-dom';
import {films} from './mocks/films';
import App from './components/app/app';

const promoFilm = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

ReactDOM.render(
  <React.StrictMode>
    <App promo={promoFilm} films={films}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
