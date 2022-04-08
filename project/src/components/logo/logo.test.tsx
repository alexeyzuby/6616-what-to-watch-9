import {render, screen} from '@testing-library/react';
import Logo from './logo';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const store = mockStore();

    history.push(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Logo/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
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
            element={<Logo/>}
          />
        </Routes>
      </HistoryRouter>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
  });
});
