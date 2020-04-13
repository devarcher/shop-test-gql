import { useState } from "react";
import Orders from "./Orders";
import { useQuery } from "react-apollo";
import { GET_ORDERS } from "../queries/queries";
import { format } from "date-fns";

const GetOrders = () => {
  const [method, setMethod] = useState("pickup");
  const todaysDate = format(new Date(), "yyyy/MM/dd");

  // console.log("getOrders Variable", method)

  const query = `tag:${todaysDate} AND tag:${method}`;

  // Apollo data
  const { data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
    variables: { query },
  });

  // console.log("Get Orders", data);
  // If today's date is not todays's date force reload the app. Refreshes URL window => force reload of all data.

  return (
    <>
      <Orders data={data} method={method} setMethod={setMethod} query={query} />
    </>
  );
};

export default GetOrders;
