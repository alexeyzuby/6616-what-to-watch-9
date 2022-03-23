import {useAppDispatch} from '../../hooks';
import {loadMore} from '../../store/action';

function ShowMore(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => {
        dispatch(loadMore());
      }}
      >Show more
      </button>
    </div>
  );
}

export default ShowMore;
