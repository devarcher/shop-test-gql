import react, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo";
import _ from "lodash";
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

const GET_ORDERS = gql`
  {
    shop {
      id
      name
    }
    orders(first: 10, query: "fulfillment_status:unshipped") {
      edges {
        node {
          id
          name
          displayFulfillmentStatus
          note
          createdAt
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
              }
            }
          }
          customer {
            id
            firstName
            lastName
            email
            phone
          }
          customAttributes {
            key
            value
          }
        }
      }
    }
  }
`;

const Orders = () => {
  // Apollo data
  const { loading, error, data } = useQuery(GET_ORDERS)

  // Local State
  const [timeStampArray, setTimeStampArray] = useState([]);
  // const [orderedArray, setOrderedArray] = useState([]);
  const [method, setMethod] = useState("");
  
  useEffect(() => {
    const dateTimeArray = [];
    if(data !== undefined) {
      data.orders.edges.map(edge => {
        const deliveryDate = getDeliveryDates(edge);
        const deliveryTime = getDeliveryTimes(edge);
        
        if(deliveryTime !== undefined) {
          const processTimesArray = deliveryTime.split(' ');
          const deliveryWindowParse = processTimesArray.slice(0, 2)
          const deliveryDueTime = deliveryWindowParse.join(' ')
          
          dateTimeArray.push(new Date(`${deliveryDate} ${deliveryDueTime}`).toISOString())
        }
        dateTimeArray.sort();
        setTimeStampArray(dateTimeArray)
      })
    }
  }, [method])
  
  useEffect(() => {
    // setOrderedArray(orderedArray => [...orderedArray, timeStampArray])
    console.log("timestamparray", timeStampArray)
  }, [timeStampArray])
  // console.log("ordered Array", orderedArray)

  const updateStatus = () => {
    console.log('hi')
  }
  
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
      {data !== undefined && data.orders.edges.map((edge) => {
        data.sort(timeStampArray)
        return (
          getCheckoutMethod(edge) === method && (
          <div key={edge.node.name} className="border p-2 w-1/3 flex content-center">
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
            </div>
            <div>
              <button onClick={() => updateStatus()} className={"btn btn-gray p-2 mt-20"}>Update Status</button>
            </div>
          </div>
          )
        )
      })}
    </>
  );
};

export default Orders;
