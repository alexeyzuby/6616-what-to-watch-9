import {Link, useParams} from 'react-router-dom';
import {useFilm} from '../../hooks/use-film';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmButtons from '../../components/film-buttons/film-buttons';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';
import {useAppSelector} from '../../hooks';
import {AuthorizationStatus} from '../../const';

const MAX_SIMILAR_COUNT = 4;

function FilmScreen(): JSX.Element {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  const params = useParams();

  const currentFilmId = Number(params.id);
  const currentFilm = useFilm(currentFilmId);

  if (currentFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (currentFilm === null || currentFilm.data.id !== currentFilmId) {
    return <LoadingScreen/>;
  }

  const similarFilmsList = currentFilm.similar.filter((film) => film.id !== currentFilm.data.id).slice(0, MAX_SIMILAR_COUNT);

  const {backgroundColor, backgroundImage, name, genre, released, id, posterImage} = currentFilm.data;

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name}/>
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <FilmButtons id={id}/>
                {authorizationStatus === AuthorizationStatus.Auth && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
            </div>
            <div className="film-card__desc">
              <FilmTabs film={currentFilm.data} comments={currentFilm.comments}/>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          {similarFilmsList.length !== 0 && <h2 className="catalog__title">More like this</h2>}
          <FilmsList films={similarFilmsList}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default FilmScreen;
