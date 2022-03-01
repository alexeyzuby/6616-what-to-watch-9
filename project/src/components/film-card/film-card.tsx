import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import FilmPreview from '../film-preview/film-preview';

type FilmCardProps = {
  film: Film,
  isActive: boolean,
  onHover: (id: number | null) => void,
};

function FilmCard({film, isActive, onHover}: FilmCardProps): JSX.Element {
  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={() => onHover(film.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="small-film-card__image">
        <FilmPreview src={film.previewVideoLink} poster={film.previewImage} isActive={isActive} isMuted/>
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>
          {film.name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
