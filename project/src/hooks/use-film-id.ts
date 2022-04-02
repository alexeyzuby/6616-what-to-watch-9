import {useParams} from 'react-router-dom';

export const useFilmId = (): number => {
  const params = useParams();

  return Number(params.id);
};
