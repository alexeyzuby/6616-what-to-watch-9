import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {Film} from '../types/film';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const getFilms = createAction<Film[]>('data/getFilms');

export const changeGenre = createAction<string>('app/changeGenre');
export const loadMore = createAction('app/loadMore');
export const resetLoadedFilmsCount = createAction('app/resetLoadedFilmsCount');
