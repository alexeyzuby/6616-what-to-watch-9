import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
    date: '2022-03-05T09:17:31.217Z',
    id: 1,
    rating: 8.9,
    user: {
      id: 4,
      name: 'Kate Muir',
    },
  },
  {
    comment: 'The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.',
    date: '2022-03-06T09:17:31.217Z',
    id: 2,
    rating: 7.2,
    user: {
      id: 3,
      name: 'Matthew Lickona',
    },
  },
  {
    comment: 'Anderson\'s films are too precious for some, but for those of us willing to lose ourselves in them, they\'re a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.',
    date: '2022-03-07T09:17:31.217Z',
    id: 3,
    rating: 8.0,
    user: {
      id: 5,
      name: 'Bill Goodykoontz',
    },
  },
];
