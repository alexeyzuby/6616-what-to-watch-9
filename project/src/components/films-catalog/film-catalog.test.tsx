import {render, screen} from '@testing-library/react';
import FilmsCatalog from './films-catalog';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {INITIAL_FILMS_COUNT, NameSpace} from '../../const';
import {makeFakeFilms} from '../../utils/mocks';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilms = makeFakeFilms();

describe('Component: FilmsCatalog', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Films]: {
        films: fakeFilms,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmsCatalog/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('film-card').length).toBeLessThanOrEqual(INITIAL_FILMS_COUNT);
  });
});
