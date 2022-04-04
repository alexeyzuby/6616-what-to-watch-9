import {State} from '../../types/state';

export const selectAuthorizationStatus = (state: State) => state.USER.authorizationStatus;
export const selectUsedData = (state: State) => state.USER.userData;
