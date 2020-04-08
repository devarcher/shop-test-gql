import gql from "graphql-tag";
import { Query } from "react-apollo";
import Orders from "../pages/orders";

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

const OrderQuery = () => {
  return (
    <div>
      <Query query={GET_ORDERS}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading…</div>;
          if (error) return <div>{error.message}</div>;

          const queryData = data.orders.edges;

          return <Orders queryData={queryData} />;
        }}
      </Query>
    </div>
  );
};

export default OrderQuery;
