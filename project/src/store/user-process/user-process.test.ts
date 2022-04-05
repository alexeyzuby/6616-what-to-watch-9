import {UserProcess} from '../../types/state';
import {requireAuthorization, setUserData, userProcess} from './user-process';
import {AuthorizationStatus} from '../../const';
import {makeFakeUserData} from '../../utils/mocks';

describe('Reducer: userProcess', () => {
  const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  };

  const fakeUserData = makeFakeUserData();

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update authorizationStatus to "AUTH"', () => {
    expect(userProcess.reducer(initialState, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual(Object.assign(initialState, {authorizationStatus: AuthorizationStatus.Auth}));
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    expect(userProcess.reducer(initialState, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual(Object.assign(initialState, {authorizationStatus: AuthorizationStatus.NoAuth}));
  });

  it('should receive user data', () => {
    expect(userProcess.reducer(initialState, setUserData(fakeUserData)))
      .toEqual(Object.assign(initialState, {userData: fakeUserData}));
  });
});
