import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { setToken } from '../../state/reducers/local';

const useClient = () => {
  const [client, setClient] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('token');
    setClient(token);
    dispatch(setToken(token));
  }, [dispatch]);

  return client;
};

export default useClient;
