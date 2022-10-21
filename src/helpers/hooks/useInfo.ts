import { useState } from 'react';
// import { getErrorMessage } from '@/services/api';

const useInfo = (initialState: BaseInfo | null = null) => {
  const [info, setInfoState] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  const setError = (err: any) => {
    if (!err) return resetAll();
    setInfoState({
      message: err,
      color: 'text-red-500',
      error: true,
    });
  };

  const setInfo = (msg: any) =>
    setInfoState({ message: msg, color: 'text-green-600' });

  const msg = info?.message;

  const color = info?.color;

  const resetRequest = () => {
    setLoading(true);
    setInfoState(initialState);
  };

  const resetAll = () => {
    setLoading(false);
    setInfoState(initialState);
  };

  return {
    info,
    setInfo,
    msg,
    color,
    setError,
    setInfoState,
    isLoading,
    setLoading,
    resetRequest,
    resetAll,
  };
};

export default useInfo;
