import {render, screen} from '@testing-library/react';
import ReviewForm from './review-form';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {MAX_FILM_RATING} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('rating').length).toEqual(MAX_FILM_RATING);
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Post/i);
  });
});
