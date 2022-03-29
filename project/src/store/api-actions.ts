import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {Comment, Review} from '../types/review';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {getCurrentFilm, getFilms, getReviews, getSimilarFilms, redirectToRoute, requireAuthorization} from './action';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      store.dispatch(getFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentFilmAction = createAsyncThunk(
  'data/fetchCurrentFilm',
  async (id: number) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      store.dispatch(getCurrentFilm(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(getCurrentFilm(undefined));
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
      store.dispatch(getSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(getReviews(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const addCommentAction = createAsyncThunk(
  'film/addComment',
  async ({filmId, comment, rating}: Comment) => {
    try {
      await api.post<Comment>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
      store.dispatch(redirectToRoute(`${APIRoute.Films}/${filmId}`));
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
