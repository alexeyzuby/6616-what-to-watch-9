import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import {selectAuthorizationStatus} from '../../store/user-process/selector';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  const signOutClickHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      {isAuth &&
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" onClick={signOutClickHandler}>Sign out</a>
          </li>
        </>}
      {!isAuth && <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
    </ul>
  );
}

export default UserBlock;
