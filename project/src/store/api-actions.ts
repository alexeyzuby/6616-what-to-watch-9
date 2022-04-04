import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {UserComment} from '../types/comment';
import {AuthData, UserData} from '../types/user';
import {setFavoriteFilms, setFilms, setPromoFilm, setCurrentFilm, setSimilarFilms, setComments} from './films-data/films-data';
import {requireAuthorization, setUserData} from './user-process/user-process';
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
      const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
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
      const {data} = await api.get<Film[]>(`${APIRoute.Comments}/${id}`);
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
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${promoId}/${isFavorite ? 0 : 1}`);
      store.dispatch(setPromoFilm(data));
    } catch (error) {
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    }
  },
);

export const setFavouriteCurrentAction = createAsyncThunk(
  'data/setFavouriteCurrent',
  async ({currentFilmId, isFavorite}: { currentFilmId: number, isFavorite: boolean }) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${currentFilmId}/${isFavorite ? 0 : 1}`);
      store.dispatch(setCurrentFilm(data));
    } catch (error) {
      store.dispatch(redirectToRoute(AppRoute.SignIn));
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
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
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
      await api.post<UserComment>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const {data: {name, avatarUrl}} = await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUserData({name, avatarUrl}));
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
      store.dispatch(fetchPromoFilmAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);
