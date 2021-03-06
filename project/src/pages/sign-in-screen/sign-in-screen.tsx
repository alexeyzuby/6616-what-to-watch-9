import {FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {AppRoute, EMAIL_TEMPLATE, PASSWORD_TEMPLATE} from '../../const';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';

function SignInScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!EMAIL_TEMPLATE.test(email)) {
      toast.error('Email is not valid');
      return;
    }

    if (!PASSWORD_TEMPLATE.test(password)) {
      toast.error('Password must contain at least one number and letter');
      return;
    }

    dispatch(loginAction({email, password}));
    navigate(AppRoute.Main);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={submitHandler}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                value={email}
                data-testid="email"
                onChange={({target}) => setEmail(target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                value={password}
                data-testid="password"
                onChange={({target}) => setPassword(target.value)}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

export default SignInScreen;
