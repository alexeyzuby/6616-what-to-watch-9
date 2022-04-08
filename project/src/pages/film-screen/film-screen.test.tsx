import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import FilmScreen from './film-screen';
import {AppRoute, AuthorizationStatus, MAX_SIMILAR_COUNT, NameSpace} from '../../const';
import {makeFakeFilm, makeFakeFilms} from '../../utils/mocks';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();

describe('Component: FilmScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  beforeEach(() => {
    history.push(`/films/${fakeFilm.id}`);
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
    expect(screen.getByTestId('review')).toBeInTheDocument();

    expect(screen.getAllByTestId('film-card').length).toBeLessThanOrEqual(MAX_SIMILAR_COUNT);
  });

  it('should render without "Add review" button when user not auth', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilms,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByTestId('review')).not.toBeInTheDocument();
  });

  it('should navigate to "/player/1" when click play button', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilms,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Player}
              element={<h1>Player screen</h1>}
            />
            <Route
              path={AppRoute.Film}
              element={<FilmScreen/>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('play'));
    expect(screen.getByText('Player screen')).toBeInTheDocument();
  });

  it('should navigate to "/films/1/review" when click review button', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
        similarFilms: fakeFilms,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.AddReview}
              element={<h1>Add review screen</h1>}
            />
            <Route
              path={AppRoute.Film}
              element={<FilmScreen/>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('review'));
    expect(screen.getByText('Add review screen')).toBeInTheDocument();
  });
});
