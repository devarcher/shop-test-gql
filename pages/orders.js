import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
        customer {
          id
          firstName
          lastName
          email
          phone
          ordersCount
          totalSpent
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
  return (
    <>
    <h1>Unfulfilled Orders</h1>
    <Query query={GET_ORDERS}>
      {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data.orders.edges);
          
          const pickupMethod = data.orders.edges[7].customAttributes

          console.log(pickupMethod)

          return data.orders.edges.map((edge) => (
          <div key={edge.node.name} className="border p-2">
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