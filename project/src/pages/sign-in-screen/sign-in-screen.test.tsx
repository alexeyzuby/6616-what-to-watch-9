import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import SignInScreen from './sign-in-screen';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: SignInScreen', () => {
  it('should render correctly', () => {
    const store = mockStore();

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInScreen/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue('test@test.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });
});
