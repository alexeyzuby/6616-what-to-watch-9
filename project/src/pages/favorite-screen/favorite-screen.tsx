import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFavoriteFilmsAction} from '../../store/api-actions';
import {selectFavoriteFilms} from '../../store/films-data/selector';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import FilmsList from '../../components/films-list/films-list';
import Footer from '../../components/footer/footer';

function FavoriteScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, []);

  const favoriteFilms = useAppSelector(selectFavoriteFilms);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms}/>
      </section>

      <Footer/>
    </div>
  );
}

export default FavoriteScreen;
