import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction<string>('changeGenre');
export const showMore = createAction('showMore');
export const resetShowMoreCount = createAction('resetShowMoreCount');
