import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

function App(): JSX.Element {
  const {isDataLoaded, films} = useAppSelector(({FILMS}) => FILMS);

  if (!isDataLoaded) {
    return <LoadingScreen/>;
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<MainScreen/>}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignInScreen/>}
      />
      <Route
        path={AppRoute.MyList}
        element={
          <PrivateRoute>
            <MyListScreen films={films}/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Film}
        element={<FilmScreen/>}
      />
      <Route
        path={AppRoute.AddReview}
        element={
          <PrivateRoute>
            <AddReviewScreen/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Player}
        element={<PlayerScreen films={films}/>}
      />
      <Route
        path="*"
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
