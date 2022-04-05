import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {makeFakeFilm, makeFakeFilms} from '../../utils/mocks';
import App from './app';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  },
  [NameSpace.Films]: {
    films: fakeFilms,
    favoriteFilms: fakeFilms,
    similarFilms: fakeFilms,
    promoFilm: fakeFilm,
    currentFilm: fakeFilm,
    isDataLoaded: true,
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();

    expect(screen.getByText(fakeFilm.name));
  });

  it('should render "SignInScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Sign in/i);
  });

  it('should render "FavoriteScreen" when user navigate to "/favorite"', () => {
    history.push(AppRoute.Favorite);

    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "FilmScreen" when user navigate to "/films/1"', () => {
    history.push(`/films/${fakeFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    expect(screen.getByText(fakeFilm.name));
  });

  it('should render "AddReviewScreen" when user navigate to "/films/1/review"', () => {
    history.push(`/films/${fakeFilm.id}/review`);

    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Post/i);

    expect(screen.getByText(fakeFilm.name));
  });

  it('should render "PlayerScreen" when user navigate to "/player/1"', () => {
    history.push(`/player/${fakeFilm.id}`);

    render(fakeApp);

    expect(screen.getByText(/Exit/i));
    expect(screen.getByText(/Play/i));
    expect(screen.getByText(/Full screen/i));

    expect(screen.getByText(fakeFilm.name));
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404. Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Oh no, page is missing/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to main page/i)).toBeInTheDocument();
  });
});
