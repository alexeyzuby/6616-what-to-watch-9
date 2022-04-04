import {FilmsData} from '../../types/state';
import {filmsData, setComments, setCurrentFilm, setFavoriteFilms, setFilms, setPromoFilm, setSimilarFilms} from './films-data';
import {makeFakeComments, makeFakeFilm, makeFakeFilms} from '../../utils/mocks';

describe('Reducer: filmsData', () => {
  const initialState: FilmsData = {
    films: [],
    favoriteFilms: [],
    similarFilms: [],
    promoFilm: null,
    currentFilm: null,
    comments: [],
    isDataLoaded: false,
  }

  const fakeFilm = makeFakeFilm();
  const fakeFilms = makeFakeFilms();
  const fakeComments = makeFakeComments();

  it('without additional parameters should return initial state', () => {
    expect(filmsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should receive films list', () => {
    expect(filmsData.reducer(initialState, setFilms(fakeFilms)))
      .toEqual(Object.assign(initialState, {films: fakeFilms, isDataLoaded: true}));
  });

  it('should receive favorite films list', () => {
    expect(filmsData.reducer(initialState, setFavoriteFilms(fakeFilms)))
      .toEqual(Object.assign(initialState, {favoriteFilms: fakeFilms}));
  });

  it('should receive similar films list', () => {
    expect(filmsData.reducer(initialState, setSimilarFilms(fakeFilms)))
      .toEqual(Object.assign(initialState, {similarFilms: fakeFilms}));
  });

  it('should receive promo film', () => {
    expect(filmsData.reducer(initialState, setPromoFilm(fakeFilm)))
      .toEqual(Object.assign(initialState, {promoFilm: fakeFilm}));
  });

  it('should receive current film', () => {
    expect(filmsData.reducer(initialState, setCurrentFilm(fakeFilm)))
      .toEqual(Object.assign(initialState, {currentFilm: fakeFilm}));
  });

  it('should receive comments list', () => {
    expect(filmsData.reducer(initialState, setComments(fakeComments)))
      .toEqual(Object.assign(initialState, {comments: fakeComments}));
  });
});
