type ShowMoreProps = {
  setMaxFilmCount: () => void,
};

function ShowMore({setMaxFilmCount}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={setMaxFilmCount}>Show more</button>
    </div>
  );
}

export default ShowMore;
