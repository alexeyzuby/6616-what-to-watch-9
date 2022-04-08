import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import NotFoundScreen from './not-found-screen';
import {Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <NotFoundScreen/>
      </HistoryRouter>,
    );

    expect(screen.getByText(/404. Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Oh no, page is missing/i)).toBeInTheDocument();

    expect(screen.getByTestId('back')).toBeInTheDocument();
  });

  it('should navigate to "/" when click to link', () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is main page</h1>}
          />
          <Route
            path='*'
            element={<NotFoundScreen/>}
          />
        </Routes>
      </HistoryRouter>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('back'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
