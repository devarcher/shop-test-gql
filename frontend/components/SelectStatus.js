import React, { useState } from "react";

import {
  ADD_ORDER_TAGS,
  REMOVE_ORDER_TAGS,
  GET_ORDERS,
} from "../queries/queries";
import { useMutation } from "react-apollo";

const selectStatus = (props) => {
  const { id, tags, query } = props;

  // OrderStatus Dropdown State
  const [orderStatus, setOrderStatus] = useState("");

  // Mutation Hooks
  const [addOrderTags] = useMutation(ADD_ORDER_TAGS);
  const [removeOrderTags] = useMutation(REMOVE_ORDER_TAGS);

  // Status update in Select Status Component
  const handleUpdateStatus = (e, id, tags) => {
    e.preventDefault();

    const statusNames = [
      "incoming",
      "inprogress",
      "ready",
      "notified",
      "recalled",
    ];
    const filteredStatus = tags.filter((status) =>
      statusNames.includes(status)
    );

    // Possibly remove all status tags
    removeOrderTags({
      variables: {
        id: id,
        tags: filteredStatus,
      },
    });

    setOrderStatus(e.target.value);

    addOrderTags({
      variables: {
        id: id,
        tags: [e.target.value],
      },
      refetchQueries: [
        {
          query: GET_ORDERS,
          variables: { query },
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
        onChange={(e) => handleUpdateStatus(e, id, tags)}
      >
        <option value="">--Status--</option>
        <option value="incoming">Incoming</option>
        <option value="inprogress">In Progress</option>
        <option value="ready">Ready</option>
        <option value="notified">Customer Notified</option>
        <option value="recalled">Recalled</option>
      </select>
    </div>
  );
};

export default selectStatus;
