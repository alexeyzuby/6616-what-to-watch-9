import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeFilm} from '../../utils/mocks';
import Player from '../../components/player/player';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: PlayerScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
      },
    });

    history.push(`/player/${fakeFilm.id}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player name={fakeFilm.name} link={fakeFilm.videoLink}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(history.location.pathname).toEqual('/player/1');

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
  });
});
