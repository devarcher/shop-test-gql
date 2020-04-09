import React, { useState } from "react";

// const ORDER_UPDATE = gql`
//   mutation orderUpdate($input: OrderInput!) {
//     orderUpdate(input: $input) {
//       order {
//         id
//       }
//       userErrors {
//         field
//         message
//       }
//     }
//   }
// `;

const selectStatus = (props) => {
  const { id } = props;
  console.log("select status id", props);
  console.log("desctructured id: ", id);

  const [orderStatus, setOrderStatus] = useState("");

  const handleStatus = (e) => {
    e.preventDefault();
    setOrderStatus(e.target.value);
  };

  console.log(orderStatus);
  return (
    <div>
      <label htmlFor="order-status-select">Update Status:</label>

      <select
        name="status"
        value={orderStatus}
        onChange={(e) => handleStatus(e)}
      >
        <option value="">--Status--</option>
        <option value="null">Cancelled</option>
        <option value="prep">In Prep</option>
        <option value="ready">Ready</option>
        <option value="notified">Customer Notified</option>
      </select>
    </div>
  );
};

export default selectStatus;
