import {useAppSelector} from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import SvgSprite from '../../components/svg-sprite/svg-sprite';
import PromoCard from '../../components/promo-card/promo-card';
import Logo from '../../components/logo/logo';
import FilmsCatalog from '../../components/films-catalog/films-catalog';

function MainScreen(): JSX.Element {
  const promoFilm = useAppSelector((state) => state.promoFilm);

  if (promoFilm === null) {
    return <LoadingScreen/>;
  }

  return (
    <>
      <SvgSprite/>
      <PromoCard promoFilm={promoFilm}/>
      <div className="page-content">
        <FilmsCatalog/>
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

export default MainScreen;
