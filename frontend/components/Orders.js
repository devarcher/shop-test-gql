import SelectStatus from "./SelectStatus";
// import _ from "lodash";
import {
  getCheckoutMethod,
  getDeliveryDates,
  getDeliveryTimes,
  getPickupTimes,
  getOrderName,
  getFulFillmentStatus,
  getCustomerFullName,
  getCustomerEmail,
  getCustomerNote,
  getOrderStatus,
} from "../utils/getCustomAttributes";

// import { format, addDays, parseISO } from 'date-fns';

const Orders = (props) => {
  const { data, method, setMethod, query } = props;

  // If Deliverys - grab time window and order by window start time
  // Pickups will be ordered in query
  // Sort here, and update the setOrderDataContext if not sorted.

  return (
    <>
      <div>
        <h1>Orders</h1>
        <div className={"w-full flex"}>
          <button
            className={"btn btn-gray mr-2"}
            onClick={() => setMethod("pickup")}
          >
            Pickups
          </button>
          <button
            className={"btn btn-gray mr-2"}
            onClick={() => setMethod("delivery")}
          >
            Deliveries
          </button>
          <button
            className={"btn btn-gray"}
            onClick={() => setMethod("shipping")}
          >
            To Ship
          </button>
        </div>
      </div>
      {data &&
        data.orders.edges.map((edge) => (
          <div key={edge.node.name}>
            {getCheckoutMethod(edge) === method && (
              <div className="border p-2 w-2/3 flex content-center">
                <div className="flex w-2/3 p-2 flex-col">
                  <h2>Order Name: {getOrderName(edge)}</h2>
                  <h4>Status: {getFulFillmentStatus(edge)}</h4>
                  <h2>Method: {getCheckoutMethod(edge)}</h2>
                  <h3>Customer Name: {getCustomerFullName(edge)}</h3>
                  <h3>Customer Email: {getCustomerEmail(edge)}</h3>
                  {edge.node.note && (
                    <h4>Customer Note: {getCustomerNote(edge)}</h4>
                  )}
                  <h2>Order Created: {edge.node.createdAt}</h2>
                  <h1> Order Status: {getOrderStatus(edge)}</h1>
                  <h2>Pickup Time: {edge.node.tags[0]}</h2>
                  <h3>Order Id: {edge.node.id}</h3>
                </div>
                <SelectStatus
                  id={edge.node.id}
                  tags={edge.node.tags}
                  query={query}
                />
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Orders;

// // Local State
// const [timeStampArray, setTimeStampArray] = useState([]);
// // const [orderedArray, setOrderedArray] = useState([]);

// useEffect(() => {
//   const dateTimeArray = [];
//   if(data !== undefined) {
//     data.orders.edges.map(edge => {
//       const deliveryDate = getDeliveryDates(edge);
//       const deliveryTime = getDeliveryTimes(edge);

//       if(deliveryTime !== undefined) {
//         const processTimesArray = deliveryTime.split(' ');
//         const deliveryWindowParse = processTimesArray.slice(0, 2)
//         const deliveryDueTime = deliveryWindowParse.join(' ')

//         dateTimeArray.push(new Date(`${deliveryDate} ${deliveryDueTime}`).toISOString())
//       }
//       dateTimeArray.sort();
//       setTimeStampArray(dateTimeArray)
//     })
//   }
// }, [method])

// useEffect(() => {
//   // setOrderedArray(orderedArray => [...orderedArray, timeStampArray])
//   console.log("timestamparray", timeStampArray)
// }, [timeStampArray])
// // console.log("ordered Array", orderedArray)

// const updateStatus = () => {
//   console.log('hi')
// }
