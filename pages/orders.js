import react, {useState} from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import _ from "lodash"

// Order Query options
// Filter orders by their fulfillment status.

// (default: any)
// shipped: Show orders that have been shipped. Returns orders with fulfillment_status of fulfilled.
// partial: Show partially shipped orders.
// unshipped: Show orders that have not yet been shipped. Returns orders with fulfillment_status of null.
// any: Show orders of any fulfillment status.
// unfulfilled: Returns orders with fulfillment_status of null or partial.

// Make shipped and unshipped
// Open vs Closed Tickets

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

  const getCheckoutMethod = (edge) => {
    return _.chain(edge.node.customAttributes)
    .find({ key: "Checkout-Method" })
    .get("value")
    .value();
  } 
  const getOrderName = (edge) => {
    return edge.node.name
  }
    const getFulFillmentStatus = (edge) => {
    return edge.node.displayFulfillmentStatus
  }
  const getCustomerFullName = (edge) => {
    return `${edge.node.customer.firstName} ${edge.node.customer.lastName}`
  }
  const getCustomerEmail = (edge) => {
    return edge.node.customer.email
  }
  const getCustomerNote = (edge) => {
    return edge.node.customer.note
  }
  const getOrderCreationTime = (edge) => {
    return edge.node.createdAt
  }
  
const Orders = () => {

  const [method, setMethod] = useState('')

  return (
    <>
    <div>
    <h1>Orders</h1>
    <div>
      <button className={"bg-transparent font-semibold hover:text-white py-2 px-4 border border-black-500 rounded"} onClick={() => setMethod("pickup")}>Pickups</button>
      <button className={"bg-transparent font-semibold hover:text-white py-2 px-4 border border-black-500 rounded"} onClick={() => setMethod("delivery")}>Deliveries</button>
      <button className={"bg-transparent font-semibold hover:text-white py-2 px-4 border border-black-500 rounded"} onClick={() => setMethod("shipping")}>To Ship</button>
    </div>
    </div>
    <Query query={GET_ORDERS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;

        const dataArray = data.orders.edges

        return dataArray.map((edge) => (
          getCheckoutMethod(edge) === method &&
          <>
          <div key={edge.node.name} className="border p-2">
            <h2>Order Name: {getOrderName(edge)}</h2>
            <h4>Status: {getFulFillmentStatus(edge)}</h4>
            <h2>Method: {getCheckoutMethod(edge)}</h2>
            <h3>Customer Name: {getCustomerFullName(edge)}</h3>
            <h3>Customer Email: {getCustomerEmail(edge)}</h3>
            {edge.node.note && <h4>Customer Note: {getCustomerNote(edge)}</h4>}
            <h4>Time Created: {getOrderCreationTime(edge)}</h4>
          </div>
          </>
        )) 
      }}
    </Query>
    </>
  )
}

export default Orders