import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('changeGenre');
export const loadMore = createAction('loadMore');
export const resetLoadedFilmsCount = createAction('resetLoadedFilmsCount');
