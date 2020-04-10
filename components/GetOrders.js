import Orders from "./Orders";
import { useQuery, useMutation } from "react-apollo";
import { GET_ORDERS, REMOVE_ORDER_TAGS } from "../queries/queries";
import { getCheckoutMethod } from "../utils/getCustomAttributes";

const GetOrders = () => {
  // Apollo data
  const { data } = useQuery(GET_ORDERS, {
    pollInterval: 5000,
  });

  const [removeOrderTags] = useMutation(REMOVE_ORDER_TAGS);

  console.log("Get Orders", data);

  if (data && data !== undefined) {
    data.orders.edges.map((edge) => {
      const tagsPickupMethod = edge.node.tags.find(
        (method) => method === "Pickup Order"
      );
      const tagsDeliveryMethod = edge.node.tags.find(
        (method) => method === "Local Delivery Order"
      );

      if (
        getCheckoutMethod(edge) === "delivery" &&
        tagsPickupMethod !== undefined
      ) {
        removeOrderTags({
          variables: {
            id: edge.node.id,
            tags: "Pickup Order",
          },
        });
      }

      if (
        getCheckoutMethod(edge) === "pickup" &&
        tagsDeliveryMethod !== undefined
      ) {
        removeOrderTags({
          variables: {
            id: edge.node.id,
            tags: "Local Delivery Order",
          },
        });
      }
    });
  }

  return (
    <>
      <Orders data={data} />
    </>
  );
};

export default GetOrders;
