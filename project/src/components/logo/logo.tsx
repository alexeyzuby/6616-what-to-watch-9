import {Link, useLocation} from 'react-router-dom';

type LogoProps = {
  className?: string,
}

function Logo({className}: LogoProps): JSX.Element {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  const logoClass = className ? `logo__link ${className}` : 'logo__link';

  return (
    <div className="logo">
      {isMainPage &&
        <span className={logoClass}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </span>}
      {!isMainPage &&
        <Link className={logoClass} to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>}
    </div>
  );
}

export default Logo;
