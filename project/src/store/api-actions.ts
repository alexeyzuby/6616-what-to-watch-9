import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {FilmComment, UserComment} from '../types/comment';
import {AuthData, UserData} from '../types/user';
import {setFilms, setPromoFilm, setSelectedFilm} from './films-data/films-data';
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

export const fetchSelectedFilmAction = createAsyncThunk(
  'data/fetchSelectedFilm',
  async (id: number) => {
    try {
      const {data: film} = await api.get<Film>(APIRoute.Film(id));
      const {data: similar} = await api.get<Film[]>(APIRoute.Similar(id));
      const {data: comments} = await api.get<FilmComment[]>(APIRoute.Comments(id));
      store.dispatch(setSelectedFilm({
        data: film,
        similar,
        comments,
      }));
    } catch (error) {
      errorHandle(error);
      store.dispatch(setSelectedFilm(undefined));
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
      errorHandle(error);
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
