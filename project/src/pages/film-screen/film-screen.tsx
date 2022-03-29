import {MouseEvent, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {fetchCurrentFilmAction, fetchReviewsAction, fetchSimilarFilmsAction} from '../../store/api-actions';
import FilmTabs from '../../components/film-tabs/film-tabs';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const MAX_SIMILAR_COUNT = 4;

function FilmScreen(): JSX.Element {
  const {currentFilm, similarFilms, reviews} = useAppSelector((state) => state);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFilmId = Number(params.id);

  useEffect(() => {
    if (currentFilm === null || currentFilm?.id !== currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
      dispatch(fetchSimilarFilmsAction(currentFilmId));
      dispatch(fetchReviewsAction(currentFilmId));
    }
  }, [currentFilm, currentFilmId, dispatch]);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  const similarFilmsList = similarFilms.filter((film) => film.id !== currentFilm.id).slice(0, MAX_SIMILAR_COUNT);

  const clickPlayHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${currentFilm.id}`);
  };

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: currentFilm.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.backgroundImage} alt={currentFilm.name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={clickPlayHandler}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"/>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${currentFilm.id}/review`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <FilmTabs film={currentFilm} reviews={reviews}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          {similarFilmsList.length !== 0 && <h2 className="catalog__title">More like this</h2>}
          <FilmsList films={similarFilmsList}/>
        </section>

        <footer className="page-footer">
          <Logo className="logo__link--light"/>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmScreen;
