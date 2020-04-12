import Orders from "./Orders";
import { useQuery } from "react-apollo";
import { GET_ORDERS } from "../queries/queries";
import useOrderContext from './OrderContext/useOrderContext';
import OrderContext from './OrderContext';

const GetOrders = () => {
  // Temp Hardcoded query variable
  const hardCodedDate = '2020/04/12';

  // Tag is date from hardCodedDate, and the tag Type is delivery.
  const query = `tag:${hardCodedDate} AND tag:delivery`; 

  /**
   * 1: Sort at database level (Their Server/Our Server)
   * 2: Sort at server level (Our Server) (Only if a back end server exists and is used/No direct shopify query)
   * 3: Sort at response time (Client) <- Least optimal 
   * 4: Sort at component render time (Client) <- Most optimal of client only.hardCodedDate
   * 
   * Consider using context if you're using the 4th option. Sort when it's rendered, this will
   * keep the cpu cycles free when the data fetched so not to interfer with paint cycles.
   * * Initialize context object with null. 
   * * Any render check if context object has data before query. Only sort if from query, and not null. 
   * * After rendering and sorting, ensure that the context object is updated with the sorted object.
   */

  // Apollo data
  const { data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
    variables: { query }
  });

  console.log("Get Orders", data);

  const orderDataDefault = useOrderContext(data);

  return (
    <>
      <OrderContext.Provider value={orderDataDefault}>
        <Orders />
      </OrderContext.Provider>
    </>
  );
};

export default GetOrders;
