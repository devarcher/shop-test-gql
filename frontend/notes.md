
1. Customer makes a New Order from website.

2. Order is created in Shopify Store. 
  A. Order has order.customAttributes with "Checkout-Method": "delivery" || "pickup" || "shipping"

  B. Order has order.tags (string[]) added (filterable as query: "tag:string" in graphQL)
      i. Date Tag query: "tag:YYYY/MM/DD" (tag:string)
      ii. Method Tag for delivery and pickup (none for shipping) => query: "tag:delivery" || "pickup" 
      iii. Time Tag also is a string in the tags []. on creation it is at tags[0].
      iv. Shipping has no tags added on order creation.
  
3. Orders can be edited in Shopify Store Pickup and Delivery App
  A. When time is changed in Pickup Order. The old tag is removed, and the new tag is added to tags[0]

4. This App - Dashboard for bakeries  
  A. See incoming orders in sections by checkout-method. Orders should be filtered by date and method and sorted by delivery / pickup time.
    i. Pickup Orders - Initial Load Screen - On Current Date (Make Date on Query a variable)
    ii. Deliveries
    iii. Shipping Orders

  B. Dyanmic Query - Based on UI window that takes polling @ a lazy interval to protect cost? 5000ms? 
    i. query  - $method / $date (polling option @ 5000ms)

  C. Ability to update status of each Order
    i. null
    ii. in-progress
    iii. ready
    iv. customer-notified

  D. Best way to make mutations for our orders to keep shopify application in synch
    i. webhooks
    ii. pollings
    iii. refetch()
    iv. mutation refetchQueries() - Using Variables as a scalple Optimistic UI

5. Order Data could be changing outside of context of our App.
  A. From Shopify Store

  B. Best way to keep our application synchronized with external changes
    i. webhooks
    ii. polling
    iii. other apollo / graphQL solution





