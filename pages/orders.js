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

const Orders = () => {

  return (
    <>
    <h1>Unfulfilled Orders</h1>
    <Query query={GET_ORDERS}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading…</div>;
        if (error) return <div>{error.message}</div>;
        // console.log(data.orders.edges);

        const dataArray = data.orders.edges
        console.log(dataArray)

        return data.orders.edges.map((edge) => (
        <div key={edge.node.name} className="border p-2">
          <h2>Method: {getCheckoutMethod(edge)}</h2>
          <h2>Order Name: {edge.node.name}</h2>
          <h4>Status: {edge.node.displayFulfillmentStatus}</h4>
          <h3>Customer Name: {edge.node.customer.firstName} {edge.node.customer.lastName}</h3>
          <h3>Customer Email: {edge.node.customer.email}</h3>
          {edge.node.note && <h4>Customer message: {edge.node.note}</h4>}
          <h4>Time Created: {edge.node.createdAt}</h4>
        </div>
        ))
      }}
    </Query>
    </>
  )
}

export default Orders