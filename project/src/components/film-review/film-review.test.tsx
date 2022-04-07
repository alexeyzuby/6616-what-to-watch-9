import {render, screen} from '@testing-library/react';
import FilmReview from './film-review';
import {makeFakeFilmComment} from '../../utils/mocks';

const fakeComment = makeFakeFilmComment();

describe('Component: FilmReview', () => {
  it('should render correctly', () => {
    render(
      <FilmReview comment={fakeComment}/>,
    );

    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.rating)).toBeInTheDocument();
  });
});
