import {createSlice} from '@reduxjs/toolkit';
import {FilmsData} from '../../types/state';
import {NameSpace} from '../../const';

const initialState: FilmsData = {
  films: [],
  favoriteFilms: [],
  similarFilms: [],
  promoFilm: null,
  currentFilm: null,
  comments: [],
  isDataLoaded: false,
};

export const filmsData = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload;
      state.isDataLoaded = true;
    },
    setFavoriteFilms: (state, action) => {
      state.favoriteFilms = action.payload;
    },
    setSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    setPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    setCurrentFilm: (state, action) => {
      state.currentFilm = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const {setFilms, setFavoriteFilms, setSimilarFilms, setPromoFilm, setCurrentFilm, setComments} = filmsData.actions;
