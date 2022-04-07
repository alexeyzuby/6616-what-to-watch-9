import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import FavoriteScreen from './favorite-screen';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeFilms} from '../../utils/mocks';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeFilms = makeFakeFilms();

describe('Component: FavoriteScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        favoriteFilms: fakeFilms,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoriteScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toEqual(fakeFilms.length);
  });
});
