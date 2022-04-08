export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Favorite = '/favorite',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

export enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export const FilmTabsItems = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
};

export const INITIAL_GENRE = 'All genres';
export const MAX_SIMILAR_COUNT = 4;
export const INITIAL_FILMS_COUNT = 8;
export const MAX_FILM_RATING = 10;
export const MIN_REVIEW_LENGTH = 50;
export const MAX_REVIEW_LENGTH = 400;

export const EMAIL_TEMPLATE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORD_TEMPLATE = /(?=.*\d)(?=.*[a-z])/;

export const ratingValues: number[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
