import request from 'axios';
import {HttpCode} from '../const';
import {ErrorType} from '../types/error';
import {store} from '../store';
import {setError} from '../store/action';
import {clearErrorAction} from '../store/api-actions';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        handleError(response.data.error);
        break;
      case HttpCode.Unauthorized:
        handleError(response.data.error);
        break;
      case HttpCode.NotFound:
        handleError(response.data.error);
        break;
    }
  }
};
