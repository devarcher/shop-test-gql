import React, { useState } from "react";
import { UPDATE_ORDER_STATUS } from "../queries/queries";
import { useMutation } from "react-apollo";

const selectStatus = (props) => {
  const { id } = props;
  const [orderStatus, setOrderStatus] = useState("");

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    setOrderStatus(e.target.value);
    updateOrderStatus({
      variables: {
        input: {
          "id": id,
          "tags": e.target.value
        },
      },
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
    </div>
  );
};

export default selectStatus;
