import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const promoFilm = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: '2014',
};

const filmsList = [
  {
    id: 1,
    image: 'img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
  },
  {
    id: 2,
    image: 'img/bohemian-rhapsody.jpg',
    title: 'Bohemian Rhapsody',
  },
  {
    id: 3,
    image: 'img/macbeth.jpg',
    title: 'Macbeth',
  },
  {
    id: 4,
    image: 'img/aviator.jpg',
    title: 'Aviator',
  },
  {
    id: 5,
    image: 'img/we-need-to-talk-about-kevin.jpg',
    title: 'We need to talk about Kevin',
  },
  {
    id: 6,
    image: 'img/what-we-do-in-the-shadows.jpg',
    title: 'What We Do in the Shadows',
  },
  {
    id: 7,
    image: 'img/revenant.jpg',
    title: 'Revenant',
  },
  {
    id: 8,
    image: 'img/johnny-english.jpg',
    title: 'Johnny English',
  },
  {
    id: 9,
    image: 'img/shutter-island.jpg',
    title: 'Shutter Island',
  },
  {
    id: 10,
    image: 'img/pulp-fiction.jpg',
    title: 'Pulp Fiction',
  },
  {
    id: 11,
    image: 'img/no-country-for-old-men.jpg',
    title: 'No Country for Old Men',
  },
  {
    id: 12,
    image: 'img/snatch.jpg',
    title: 'Snatch',
  },
  {
    id: 13,
    image: 'img/moonrise-kingdom.jpg',
    title: 'Moonrise Kingdom',
  },
  {
    id: 14,
    image: 'img/seven-years-in-tibet.jpg',
    title: 'Seven Years in Tibet',
  },
  {
    id: 15,
    image: 'img/midnight-special.jpg',
    title: 'Midnight Special',
  },
  {
    id: 16,
    image: 'img/war-of-the-worlds.jpg',
    title: 'War of the Worlds',
  },
  {
    id: 17,
    image: 'img/dardjeeling-limited.jpg',
    title: 'Dardjeeling Limited',
  },
  {
    id: 18,
    image: 'img/orlando.jpg',
    title: 'Orlando',
  },
  {
    id: 19,
    image: 'img/mindhunter.jpg',
    title: 'Mindhunter',
  },
  {
    id: 20,
    image: 'img/midnight-special.jpg',
    title: 'Midnight Special',
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App promo={promoFilm} films={filmsList}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
