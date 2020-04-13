import { useState, useCallback } from 'react';

const useOrderDataContext = (data) => {
  const [orderDataState, setOrderDataState] = useState(data);

  console.log("inside context intial data: ", data)
  console.log("inside context: ", orderDataState)

  
  const setOrderDataContext = useCallback((newData) => {
    setOrderDataState(newData);
  }, [setOrderDataState]);
  
  return {
    orderData: orderDataState,
    setOrderDataContext,
    isSorted: false
  };
};

export default useOrderDataContext;
