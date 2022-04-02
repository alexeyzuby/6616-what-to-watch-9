import {Link} from 'react-router-dom';
import {useFilm} from '../../hooks/use-film';
import {useFilmId} from '../../hooks/use-film-id';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import ReviewForm from '../../components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';

function AddReviewScreen(): JSX.Element {
  const selectedFilm = useFilm();
  const selectedFilmId = useFilmId();

  if (selectedFilm === undefined) {
    return <NotFoundScreen/>;
  }

  if (selectedFilm === null || selectedFilm.data.id !== selectedFilmId) {
    return <LoadingScreen/>;
  }

  const {backgroundColor, backgroundImage, name, id, posterImage} = selectedFilm.data;

  return (
    <section className="film-card film-card--full" style={{backgroundColor: backgroundColor}}>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserBlock/>
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={`${name} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        <ReviewForm/>
      </div>
    </section>
  );
}

export default AddReviewScreen;
