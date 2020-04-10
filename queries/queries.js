import gql from "graphql-tag";

export const GET_ORDERS = gql`
  {
    shop {
      id
      name
    }
    orders(first: 25, query: "fulfillment_status:unshipped") {
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

export const ADD_ORDER_TAGS = gql`
  mutation tagsAdd($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      node {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_ORDER_TAGS = gql`
  mutation tagsRemove($id: ID!, $tags: [String!]!) {
    tagsRemove(id: $id, tags: $tags) {
      node {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`;
