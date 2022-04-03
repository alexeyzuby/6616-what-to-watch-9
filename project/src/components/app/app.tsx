import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import FavoriteScreen from '../../pages/favorite-screen/favorite-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {selectIsDataLoaded} from '../../store/films-data/selector';

function App(): JSX.Element {
  const isDataLoaded = useAppSelector(selectIsDataLoaded);

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
        path={AppRoute.Favorite}
        element={
          <PrivateRoute>
            <FavoriteScreen/>
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
        element={<PlayerScreen/>}
      />
      <Route
        path="*"
        element={<NotFoundScreen/>}
      />
    </Routes>
  );
}

export default App;
