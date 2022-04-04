export type User = {
  id: number;
  name: string;
};

export type FilmComment = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type UserComment = {
  id: number,
  comment: string,
  rating: number,
}
