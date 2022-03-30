import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {cleanCurrentFilm} from '../../store/films-data/films-data';
import {fetchCurrentFilmAction} from '../../store/api-actions';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';

function AddReviewScreen(): JSX.Element {
  const {currentFilm} = useAppSelector(({FILMS}) => FILMS);

  const params = useParams();
  const dispatch = useDispatch();

  const currentFilmId = Number(params.id);

  useEffect(() => {
    if (currentFilm === null || currentFilm?.id !== currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
    }
  }, [currentFilm, currentFilmId, dispatch]);

  useEffect(() => () => {
    dispatch(cleanCurrentFilm());
  }, [dispatch]);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  return (
    <section className="film-card film-card--full" style={{backgroundColor: currentFilm.backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={currentFilm.backgroundImage} alt={currentFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${currentFilm.id}`} className="breadcrumbs__link">{currentFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <ReviewForm/>
      </div>
    </section>
  );
}

export default AddReviewScreen;
