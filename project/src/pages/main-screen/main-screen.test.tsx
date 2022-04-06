import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeFilm, makeFakeFilms} from '../../utils/mocks';
import MainScreen from './main-screen';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);
const fakeFilms = makeFakeFilms();

describe('Component: MainScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        films: fakeFilms,
        promoFilm: fakeFilm,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen/>
        </HistoryRouter>,
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
