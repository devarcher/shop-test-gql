import { useState, useCallback } from 'react';

const useOrderDataContext = (data) => {
  const [orderDataState, setOrderDataState] = useState(data);

  const setOrderDataContext = useCallback((newData) => {
    setOrderDataState(newData);
  }, [setOrderDataState]);

  return {
    orderData: orderDataState,
    setOrderDataContext,
  };
};

export default useOrderDataContext;
