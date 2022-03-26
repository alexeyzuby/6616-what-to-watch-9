import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './index';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {Film} from '../types/film';
import {errorHandle} from '../services/error-handle';
import {getFilms, setError} from './action';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

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
