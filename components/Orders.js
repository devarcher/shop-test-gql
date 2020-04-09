import React, { useState } from "react";
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
  getOrderCreationTime,
} from "../utils/getCustomAttributes";

const Orders = (props) => {
  const { data } = props;
  const [method, setMethod] = useState("");

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
                  <h4>Due Date: {getDeliveryDates(edge)}</h4>
                  <h4>Due Time: {getDeliveryTimes(edge)}</h4>
                  <h5>Order id: {edge.node.id}</h5>
                </div>
                <SelectStatus id={edge.node.id} />
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default Orders;

// let input;
// const [orderUpdate, { data }] = useMutation(ORDER_UPDATE);

// e.preventDefault();
// orderUpdate({ variables: { input: input.value } });
// input.value = "";

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
