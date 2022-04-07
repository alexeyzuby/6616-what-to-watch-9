import {render, screen} from '@testing-library/react';
import FilmsList from './films-list';
import {makeFakeFilms} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilms = makeFakeFilms();

describe('Component: FilmsList', () => {
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
          <FilmsList films={fakeFilms}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getAllByTestId('film-card').length).toEqual(fakeFilms.length);
  });
});
