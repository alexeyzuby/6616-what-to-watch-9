import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {AppDispatch, State} from '../types/state.js';
import {Film} from '../types/film';
import {UserComment} from '../types/comment';
import {AuthData, UserData} from '../types/user';
import {setFavoriteFilms, setFilms, setPromoFilm, setCurrentFilm, setSimilarFilms, setComments} from './films-data/films-data';
import {requireAuthorization, setUserData} from './user-process/user-process';
import {dropToken, saveToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {redirectToRoute} from './action';

type AsyncThunkProps = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}

export const fetchFilmsAction = createAsyncThunk<void, undefined, AsyncThunkProps>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Films);
      dispatch(setFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, AsyncThunkProps>(
  'data/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(APIRoute.Favorite);
      dispatch(setFavoriteFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, AsyncThunkProps>(
  'data/fetchSimilarFilms',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
      dispatch(setSimilarFilms(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, AsyncThunkProps>(
  'data/fetchCommentsFilms',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(`${APIRoute.Comments}/${id}`);
      dispatch(setComments(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, AsyncThunkProps>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(APIRoute.Promo);
      dispatch(setPromoFilm(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchCurrentFilmAction = createAsyncThunk<void, number, AsyncThunkProps>(
  'data/fetchCurrentFilm',
  async (id, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${id}`);
      dispatch(setCurrentFilm(data));
    } catch (error) {
      errorHandle(error);
      dispatch(setCurrentFilm(undefined));
    }
  },
);

export const addCommentAction = createAsyncThunk<void, UserComment, AsyncThunkProps>(
  'film/addComment',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    try {
      await api.post<UserComment>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(redirectToRoute(`${APIRoute.Films}/${id}`));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavouritePromoAction = createAsyncThunk<void, { promoId: number, isFavorite: boolean }, AsyncThunkProps>(
  'data/setFavouritePromo',
  async ({promoId, isFavorite}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${promoId}/${isFavorite ? 0 : 1}`);
      dispatch(setPromoFilm(data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  },
);

export const setFavouriteCurrentAction = createAsyncThunk<void, { currentFilmId: number, isFavorite: boolean }, AsyncThunkProps>(
  'data/setFavouriteCurrent',
  async ({currentFilmId, isFavorite}, {dispatch, extra: api} ) => {
    try {
      const {data} = await api.post<Film>(`${APIRoute.Favorite}/${currentFilmId}/${isFavorite ? 0 : 1}`);
      dispatch(setCurrentFilm(data));
    } catch (error) {
      dispatch(redirectToRoute(AppRoute.SignIn));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, AsyncThunkProps>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {name, avatarUrl}} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData({name, avatarUrl}));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, AsyncThunkProps>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkProps>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(fetchPromoFilmAction());
    } catch (error) {
      errorHandle(error);
    }
  },
);
