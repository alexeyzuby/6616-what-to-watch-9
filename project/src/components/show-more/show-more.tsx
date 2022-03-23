import {useAppDispatch} from '../../hooks';
import {showMore} from '../../store/action';

type ShowMoreProps = {
  filmsCount: number,
  showedCount: number,
}

function ShowMore({filmsCount, showedCount}: ShowMoreProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  if (showedCount >= filmsCount) {
    return null;
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {
        dispatch(showMore());
      }}
      >Show more
      </button>
    </div>
  );
}

export default ShowMore;
