import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import PromoFilm from './promo-film';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: PromoFilm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        promoFilm: fakeFilm,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PromoFilm/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('favorite')).toBeInTheDocument();
  });
});
