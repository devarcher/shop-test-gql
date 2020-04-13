import Orders from "./Orders";
import { useQuery } from "react-apollo";
import { GET_ORDERS } from "../queries/queries";

const GetOrders = () => {
  
  // First query: All open orders
  // Create array of all dates For any open Pickups or Deliveries : Reading try tags[0] but if unreliable: customAttributes => populate Date Picker utilize iPad IOS date picker input with type=Date values={...arrayDates}
  
  // If no orders are for today, includes today's date 
  // Only pull dates for 2 weeks out. 

  // If today's date is not todays's date force reload the app. Refreshes URL window => force reload of all data.

  // Temp Hardcoded query variable
  const hardCodedDate = '2020/04/12';
  const hardCodedMethod = 'delivery'

  // Tag is date from hardCodedDate, and the tag Type is delivery.
  const query = `tag:${hardCodedDate} AND tag:${hardCodedMethod}`; 

  // Apollo data
  const { data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
    variables: { query }
  });

  console.log("Get Orders", data);

  return (
    <>
      <Orders data={data} />
    </>
  );
};

export default GetOrders;
