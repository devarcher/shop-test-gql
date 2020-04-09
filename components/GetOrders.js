import gql from "graphql-tag";
import { useQuery } from "react-apollo";
import Orders from "./Orders";

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

const GetOrders = () => {
  // Apollo data
  const { loading, error, data } = useQuery(GET_ORDERS, {
    pollInterval: 30000,
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
