import {render, screen} from '@testing-library/react';
import FilmCard from './film-card';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: FilmCard', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const cardHoverHandler = jest.fn();

    render(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          isActive={false}
          onHover={cardHoverHandler}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    userEvent.hover(screen.getByTestId('film-card'));
    expect(cardHoverHandler).toBeCalled();
  });
});
