import {render, screen} from '@testing-library/react';
import Player from './player';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../utils/mocks';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: Player', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player name={fakeFilm.name} link={fakeFilm.videoLink}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('exit')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('fullscreen')).toBeInTheDocument();
  });
});
