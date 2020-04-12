import React, { useState } from "react";
import {
  ADD_ORDER_TAGS,
  GET_ORDERS,
} from "../queries/queries";
import { useMutation } from "react-apollo";

const selectStatus = (props) => {
  const { id } = props;
  const [orderStatus, setOrderStatus] = useState("");

  const [addOrderTags, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_ORDER_TAGS);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setOrderStatus(e.target.value);

    addOrderTags({
      variables: {
        id: id,
        tags: [e.target.value],
      },
      refetchQueries: [
        {
          query: GET_ORDERS,
          variables: { tags: "tags" },
        },
      ],
    });
  };

  return (
    <div className={"p-2"}>
      <label htmlFor="order-status-select">Update Status:</label>

      <select
        name="status"
        value={orderStatus}
        onChange={(e) => handleUpdateStatus(e)}
      >
        <option value="">--Status--</option>
        <option value="null">Cancelled</option>
        <option value="prep">In Prep</option>
        <option value="ready">Ready</option>
        <option value="notified">Customer Notified</option>
        <option value="complete">Order Completed</option>
      </select>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
};

export default selectStatus;
