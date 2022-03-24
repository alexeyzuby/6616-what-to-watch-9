import {Link, useParams} from 'react-router-dom';
import {Films} from '../../types/film';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AddReviewScreenProps = {
  films: Films,
}

function AddReviewScreen({films}: AddReviewScreenProps): JSX.Element {
  const params = useParams();
  const currentFilm = films.find((film) => film.id === Number(params.id));

  if (!currentFilm) {
    return <NotFoundScreen/>;
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
