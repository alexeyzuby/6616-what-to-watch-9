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
