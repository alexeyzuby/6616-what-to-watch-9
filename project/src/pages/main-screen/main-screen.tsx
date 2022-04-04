import PromoFilm from '../../components/promo-film/promo-film';
import FilmsCatalog from '../../components/films-catalog/films-catalog';
import Footer from '../../components/footer/footer';

function MainScreen(): JSX.Element {
  return (
    <>
      <PromoFilm/>
      <div className="page-content">
        <FilmsCatalog/>
        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;
