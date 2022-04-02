export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
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

export const APIRoute = {
  Films: '/films',
  Promo: '/promo',
  Login: '/login',
  Logout: '/logout',
  Film: (id: number) => `/films/${id}`,
  Similar: (id: number) => `/films/${id}/similar`,
  Comments: (id: number) => `/comments/${id}`,
};
