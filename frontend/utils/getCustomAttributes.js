import _ from "lodash";

export const getCheckoutMethod = (edge) => {
  const methods = ["Store Pickup", "Local Delivery", "Shipping"]
  const tagsArr = edge.node.tags;
  const orderMethod = tagsArr.filter((method) => methods.includes(method));
  const method = orderMethod[0];
  const quotedMethod = `${JSON.stringify(method)}`
  return quotedMethod
};
export const getDeliveryDates = (edge) => {
  return _.chain(edge.node.customAttributes)
    .find({ key: "Delivery-Date" })
    .get("value")
    .value();
};
export const getPickupTimes = (edge) => {
  return _.chain(edge.node.customAttributes)
    .find({ key: "Pickup-Time" })
    .get("value")
    .value();
};
export const getDeliveryTimes = (edge) => {
  return _.chain(edge.node.customAttributes)
    .find({ key: "Delivery-Time" })
    .get("value")
    .value();
};
export const getOrderStatus = (edge) => {
  const statusNames = [
    "incoming",
    "inprogress",
    "ready",
    "notified",
    "recalled",
  ];
  const tagsArr = edge.node.tags;
  const orderStatus = tagsArr.filter((status) => statusNames.includes(status));
  return orderStatus;
};
export const getOrderName = (edge) => {
  return edge.node.name;
};
export const getFulFillmentStatus = (edge) => {
  return edge.node.displayFulfillmentStatus;
};
export const getCustomerFullName = (edge) => {
  return `${edge.node.customer.firstName} ${edge.node.customer.lastName}`;
};
export const getCustomerEmail = (edge) => {
  return edge.node.customer.email;
};
export const getCustomerNote = (edge) => {
  return edge.node.customer.note;
};
export const getOrderCreationTime = (edge) => {
  return edge.node.createdAt;
};
