import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import AddReviewScreen from './add-review-screen';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeFilm} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeFilm = makeFakeFilm(1);

describe('Component: AddReviewScreen', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
      [NameSpace.Films]: {
        currentFilm: fakeFilm,
      },
    });

    history.push(`/films/${fakeFilm.id}/review`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewScreen/>
        </HistoryRouter>,
      </Provider>
    );

    expect(history.location.pathname).toEqual('/films/1/review');

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });
});
