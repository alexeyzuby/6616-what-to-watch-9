import {useAppSelector} from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import PromoCard from '../../components/promo-card/promo-card';
import FilmsCatalog from '../../components/films-catalog/films-catalog';
import Footer from '../../components/footer/footer';

function MainScreen(): JSX.Element {
  const {promoFilm} = useAppSelector(({FILMS}) => FILMS);

  if (promoFilm === null) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <PromoCard promoFilm={promoFilm}/>
      <div className="page-content">
        <FilmsCatalog/>
        <Footer/>
      </div>
    </>
  );
}

export default MainScreen;
