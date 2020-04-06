import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_ORDERS = gql`
  {
 	shop {
    id
    name
  }
  orders(first:10) {
    edges {
      node {
        id
        name
        displayFulfillmentStatus
        note
      }
    }
  }
}
`;

const Orders = () => {
  return (
    <>
    <h1>Orders</h1>
    <Query query={GET_ORDERS}>
      {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;
          console.log(data.orders.edges);

          return data.orders.edges.map((edge, index) => (
          <div key={index} className="border p-2">
            <h3>Order Name: {edge.node.name}</h3>
            <h4>Status: {edge.node.displayFulfillmentStatus}</h4>
            <h4>Customer message: {edge.node.note}</h4>
          </div>
          ))

      }}
    </Query>
    </>
  )
}

export default Orders