import {render, screen} from '@testing-library/react';
import GenresList from './genres-list';
import {INITIAL_GENRE} from '../../const';
import {makeFakeGenres} from '../../utils/mocks';

const fakeGenres = makeFakeGenres();

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    const currentGenreChangeHandler = jest.fn();
    const maxFilmCountChangeHandler = jest.fn();

    render(
      <GenresList
        genres={fakeGenres}
        currentGenre={INITIAL_GENRE}
        setCurrentGenre={currentGenreChangeHandler}
        setMaxFilmCount={maxFilmCountChangeHandler}
      />
    );

    expect(screen.getAllByTestId('genre').length).toEqual(fakeGenres.length);
  });
});
