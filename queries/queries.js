import gql from "graphql-tag";

export const GET_ORDERS = gql`
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
          tags           
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

export const UPDATE_ORDER_STATUS = gql`
  mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;