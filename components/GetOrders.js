import Orders from "./Orders";
import { useQuery } from "react-apollo";
import { GET_ORDERS } from "../queries/queries";

const GetOrders = () => {
  // Apollo data
  const { loading, error, data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log("Get Orders", data);

  return (
    <>
      <Orders data={data} />
    </>
  );
};

export default GetOrders;
