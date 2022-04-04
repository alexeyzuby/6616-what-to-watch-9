import {State} from '../../types/state';

export const selectIsDataLoaded = (state: State) => state.FILMS.isDataLoaded;
export const selectFilms = (state: State) => state.FILMS.films;
export const selectPromoFilms = (state: State) => state.FILMS.promoFilm;
export const selectCurrentFilms = (state: State) => state.FILMS.currentFilm;
export const selectFavoriteFilms = (state: State) => state.FILMS.favoriteFilms;
export const selectSimilarFilms = (state: State) => state.FILMS.similarFilms;
export const selectComments = (state: State) => state.FILMS.comments;
