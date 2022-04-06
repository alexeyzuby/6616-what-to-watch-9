import {render, screen} from '@testing-library/react';
import Logo from './logo';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';

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
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
