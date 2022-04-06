import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import FilmScreen from './film-screen';
import {AuthorizationStatus, MAX_SIMILAR_COUNT, NameSpace} from '../../const';
import {makeFakeFilm, makeFakeFilms} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();

describe('Component: FilmScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilms,
      },
    });

    history.push(`/films/${fakeFilm.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmScreen/>
        </HistoryRouter>,
      </Provider>
    );

    expect(history.location.pathname).toEqual('/films/1');

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
    expect(screen.getByTestId('review')).toBeInTheDocument();

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    expect(screen.getAllByTestId('film-card').length).toBeLessThanOrEqual(MAX_SIMILAR_COUNT);
  });
});
