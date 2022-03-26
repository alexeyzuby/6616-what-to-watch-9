import {createAction} from '@reduxjs/toolkit';
import {Films} from '../types/film';

export const getFilms = createAction<Films>('data/getFilms');

export const changeGenre = createAction<string>('app/changeGenre');
export const loadMore = createAction('app/loadMore');
export const resetLoadedFilmsCount = createAction('app/resetLoadedFilmsCount');
export const setError = createAction<string>('app/setError');
