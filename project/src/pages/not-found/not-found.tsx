import {Link} from 'react-router-dom';
import {LayoutPlace} from '../../const';
import Logo from '../../components/logo/logo';

function NotFound(): JSX.Element {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo location={LayoutPlace.Header}/>

        <h1 className="page-title user-page__title">404. Not Found</h1>
      </header>

      <div className="user-page__content" style={{textAlign: 'center'}}>
        <p>Oh no, page is missing!</p>
        <Link to="/" style={{color: 'inherit'}}>Back to main page</Link>
      </div>

      <footer className="page-footer">
        <Logo location={LayoutPlace.Footer}/>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default NotFound;
