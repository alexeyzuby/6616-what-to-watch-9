export type User = {
  id: number;
  name: string;
};

export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
};

export type Comment = {
  id: number,
  comment: string,
  rating: number,
}
