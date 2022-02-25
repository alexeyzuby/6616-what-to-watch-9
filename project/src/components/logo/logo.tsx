import {Link} from 'react-router-dom';

type LogoProps = {
  className?: string,
}

function Logo({className}: LogoProps): JSX.Element {
  const logoClass = className ? `logo__link ${className}` : 'logo__link';

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

export default Logo;
