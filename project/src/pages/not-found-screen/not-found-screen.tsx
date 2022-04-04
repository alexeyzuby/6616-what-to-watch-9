import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">404. Not Found</h1>
      </header>

      <div className="user-page__content" style={{textAlign: 'center'}}>
        <p>Oh no, page is missing!</p>
        <Link to="/" style={{color: 'inherit'}}>Back to main page</Link>
      </div>

      <Footer/>
    </div>
  );
}

export default NotFoundScreen;
