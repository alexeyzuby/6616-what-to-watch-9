import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../const';
import {Film} from '../types/film';
import {Review} from '../types/review';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const getFilms = createAction<Film[]>('data/getFilms');
export const getCurrentFilm = createAction<Film | undefined>('data/getCurrentFilm');
export const cleanCurrentFilm = createAction('data/cleanCurrentFilm');
export const getSimilarFilms = createAction<Film[]>('data/getSimilarFilms');
export const getReviews = createAction<Review[]>('data/getReviews');

export const changeGenre = createAction<string>('app/changeGenre');
export const loadMore = createAction('app/loadMore');
export const resetLoadedFilmsCount = createAction('app/resetLoadedFilmsCount');
export const redirectToRoute = createAction<string>('app/redirectToRoute');
