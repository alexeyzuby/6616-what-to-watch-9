import {render, screen} from '@testing-library/react';
import Player from './player';
import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: Player', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Player name={fakeFilm.name} link={fakeFilm.videoLink}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();

    expect(screen.getByTestId('exit')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();
    expect(screen.getByTestId('fullscreen')).toBeInTheDocument();
  });

  it('should navigate back when click exit', () => {

    history.push('/');
    history.push(`/player/${fakeFilm.id}`);

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>Film screen</h1>}
          />
          <Route
            path={AppRoute.Player}
            element={<Player name={fakeFilm.name} link={fakeFilm.videoLink}/>}
          />
        </Routes>
      </HistoryRouter>,
    );

    userEvent.click(screen.getByTestId('exit'));
    expect(screen.getByText('Film screen')).toBeInTheDocument();
  });
});
