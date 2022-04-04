import {MouseEvent, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchCommentsAction, fetchCurrentFilmAction, fetchSimilarFilmsAction, setFavouriteCurrentAction} from '../../store/api-actions';
import {selectAuthorizationStatus} from '../../store/user-process/selector';
import {selectComments, selectCurrentFilms, selectSimilarFilms} from '../../store/films-data/selector';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';

const MAX_SIMILAR_COUNT = 4;

function FilmScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentFilm = useAppSelector(selectCurrentFilms);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const commentsList = useAppSelector(selectComments);
  const currentFilmId = Number(params.id);

  useEffect(() => {
    if (currentFilmId) {
      dispatch(fetchCurrentFilmAction(currentFilmId));
      dispatch(fetchSimilarFilmsAction(currentFilmId));
      dispatch(fetchCommentsAction(currentFilmId));
    }
  }, [dispatch, currentFilmId]);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  const isFavorite = currentFilm.isFavorite;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const clickPlayHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${currentFilm.id}`);
  };

  const clickFavoriteHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setFavouriteCurrentAction({currentFilmId, isFavorite}));
  };

  const filteredSimilarFilms = similarFilms.filter((film) => film.id !== currentFilm.id).slice(0, MAX_SIMILAR_COUNT);

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
                <button className="btn btn--list film-card__button" type="button" onClick={clickFavoriteHandler}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {isFavorite && isAuth ? <use xlinkHref="#in-list"/> : <use xlinkHref="#add"/>}
                  </svg>
                  <span>My list</span>
                </button>
                {isAuth && <Link to={`/films/${currentFilm.id}/review`} className="btn film-card__button">Add review</Link>}
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
              <FilmTabs film={currentFilm} comments={commentsList}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          {filteredSimilarFilms.length !== 0 && <h2 className="catalog__title">More like this</h2>}
          <FilmsList films={filteredSimilarFilms}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default FilmScreen;
