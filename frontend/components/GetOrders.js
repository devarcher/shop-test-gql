import { useState } from "react";
import Orders from "./Orders";
import { useQuery } from "react-apollo";
import { GET_ORDERS } from "../queries/queries";
import { format } from "date-fns";

const GetOrders = () => {
  const [method, setMethod] = useState('"Store Pickup"');
  const todaysDate = format(new Date(), "yyyy/MM/dd");

  const query = `tag:${todaysDate} AND tag:${method}`;

  
  // Apollo data
  const { data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
    variables: { query },
  });
  
  // console.log(data)
  // If today's date is not todays's date force reload the app. Refreshes URL window => force reload of all data.

  return (
    <>
      {data && data !== undefined && <Orders data={data} method={method} setMethod={setMethod} query={query} />}
    </>
  );
};

export default GetOrders;
