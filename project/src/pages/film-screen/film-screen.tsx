import {MouseEvent} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Film} from '../../types/film';
import Logo from '../../components/logo/logo';
import FilmTabs from '../../components/film-tabs/film-tabs';
import SimilarFilms from '../../components/similar-films/similar-films';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const MAX_SIMILAR_COUNT = 4;

type FilmScreenProps = {
  films: Film[],
}

function FilmScreen({films}: FilmScreenProps): JSX.Element {
  const navigate = useNavigate();
  const params = useParams();
  const currentFilm = films.find((film) => film.id === Number(params.id));

  if (!currentFilm) {
    return <NotFoundScreen/>;
  }

  const clickPlayHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    navigate(`/player/${currentFilm.id}`);
  };

  const similarFilms = films.filter((film) => film.genre === currentFilm.genre && film.id !== currentFilm.id).slice(0, MAX_SIMILAR_COUNT);

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

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
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
              <FilmTabs film={currentFilm}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <SimilarFilms films={similarFilms}/>
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
