import {Link, useParams} from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmButtons from '../../components/film-buttons/film-buttons';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';
import {selectAuthorizationStatus} from '../../store/user-process/selector';
import {selectComments, selectCurrentFilms, selectSimilarFilms} from '../../store/films-data/selector';
import {useEffect} from 'react';
import {fetchCommentsAction, fetchCurrentFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';

const MAX_SIMILAR_COUNT = 4;

function FilmScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const dispatch = useAppDispatch();
  const params = useParams();

  const currentFilm = useAppSelector(selectCurrentFilms);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const commentsList = useAppSelector(selectComments);
  const currentFilmId = Number(params.id);

  useEffect(() => {
    if (currentFilm === null || currentFilm?.id !== currentFilmId) {
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
                <FilmButtons id={currentFilm.id}/>
                {authorizationStatus === AuthorizationStatus.Auth && <Link to={`/films/${currentFilm.id}/review`} className="btn film-card__button">Add review</Link>}
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
