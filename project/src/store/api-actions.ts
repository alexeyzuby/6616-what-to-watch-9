import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {UserComment} from '../types/comment';
import {AuthData, UserData} from '../types/user';
import {setFavoriteFilms, setFilms, setPromoFilm, setCurrentFilm, setSimilarFilms, setComments} from './films-data/films-data';
import {requireAuthorization} from './user-process/user-process';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {redirectToRoute} from './action';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(setFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk(
  'data/fetchFavoriteFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      store.dispatch(setFavoriteFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Similar(id));
      store.dispatch(setSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk(
  'data/fetchCommentsFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Comments(id));
      store.dispatch(setComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavouritePromoAction = createAsyncThunk(
  'data/setFavouritePromo',
  async ({promoId, isFavorite}: { promoId: number, isFavorite: boolean }) => {
    try {
      const {data} = await api.post<Film>(APIRoute.setFavorite(promoId, isFavorite));
      store.dispatch(setPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavouriteCurrentAction = createAsyncThunk(
  'data/setFavouriteCurrent',
  async ({currentFilmId, isFavorite}: { currentFilmId: number, isFavorite: boolean }) => {
    try {
      const {data} = await api.post<Film>(APIRoute.setFavorite(currentFilmId, isFavorite));
      store.dispatch(setCurrentFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      const {data} = await api.get<Film>(APIRoute.Promo);
      store.dispatch(setPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentFilmAction = createAsyncThunk(
  'data/fetchCurrentFilm',
  async (id: number) => {
    try {
      const {data} = await api.get<Film>(APIRoute.Film(id));
      store.dispatch(setCurrentFilm(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(setCurrentFilm(undefined));
    }
  },
);

export const addCommentAction = createAsyncThunk(
  'film/addComment',
  async ({id, comment, rating}: UserComment) => {
    try {
      await api.post<UserComment>(APIRoute.Comments(id), {comment, rating});
      store.dispatch(redirectToRoute(APIRoute.Film(id)));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
