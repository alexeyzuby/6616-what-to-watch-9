import {Link, useLocation} from 'react-router-dom';

type LogoProps = {
  className?: string,
}

function Logo({className}: LogoProps): JSX.Element {
  const location = useLocation();
  const logoClass = className ? `logo__link ${className}` : 'logo__link';

  if (location.pathname === '/') {
    return (
      <div className="logo">
        <span className={logoClass}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </span>
      </div>
    );
  } else {
    return (
      <div className="logo">
        <Link className={logoClass} to="/">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
    );
  }
}

export default Logo;
