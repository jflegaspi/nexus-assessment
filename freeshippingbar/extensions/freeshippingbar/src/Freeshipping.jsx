import {
  reactExtension,
  Banner,
  useSubtotalAmount
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension(
  "Checkout::Dynamic::Render",
  () => <FreeShippingBar />
);

function FreeShippingBar() {
  const subtotal = useSubtotalAmount();
  const freeShippingThreshold = 100;
  const amountNeeded = freeShippingThreshold - subtotal.amount;

  if (amountNeeded <= 0) {
    return (
      <Banner status="success">
        Shipping is free! Your order qualifies for free shipping.
      </Banner>
    );
  }
  
  const formattedAmount = amountNeeded.toFixed(2);
  const message = "$" + formattedAmount + " to go for FREE shipping.";
  
  return (
    <Banner>
      {message}
    </Banner>
  );
}