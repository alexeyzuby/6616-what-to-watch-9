import {useAppSelector} from './index';
import {AuthorizationStatus} from '../const';

export const useAuth = () => {
  const {authorizationStatus} = useAppSelector(({USER}) => USER);

  return authorizationStatus === AuthorizationStatus.Auth;
};
