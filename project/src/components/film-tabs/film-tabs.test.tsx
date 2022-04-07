import {render, screen} from '@testing-library/react';
import FilmTabs from './film-tabs';
import {makeFakeComments, makeFakeFilm} from '../../utils/mocks';
import {FilmTabsItems} from '../../const';

const fakeFilm = makeFakeFilm(1);
const fakeComments = makeFakeComments();

describe('Component: FilmTabs', () => {
  it('should render correctly', () => {
    render(
      <FilmTabs
        film={fakeFilm}
        comments={fakeComments}
      />,
    );

    expect(screen.getByText(FilmTabsItems.Overview)).toBeInTheDocument();
    expect(screen.getByText(FilmTabsItems.Details)).toBeInTheDocument();
    expect(screen.getByText(FilmTabsItems.Reviews)).toBeInTheDocument();
  });
});
