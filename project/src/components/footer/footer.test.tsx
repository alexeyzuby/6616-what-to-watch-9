import {render, screen} from '@testing-library/react';
import Footer from './footer';
import HistoryRouter from '../history-route/history-route';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const store = mockStore();

    history.push(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Footer/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd/i));
  });
});
