import '@shopify/ui-extensions/preact';
import { render } from "preact";

export default async () => {
  render(<FreeShippingBar />, document.body)
};

function FreeShippingBar() {
  // Set the free shipping threshold to $100
  const freeShippingThreshold = 100;
  
  // Placeholder: In a real checkout, you would get the actual subtotal
  // For now, we'll show the message
  const subtotalAmount = 45; // Example amount
  
  // Calculate how much more the customer needs to spend
  const amountNeeded = freeShippingThreshold - subtotalAmount;
  
  // Check if the customer has reached the free shipping threshold
  if (amountNeeded <= 0) {
    // Show success message when they qualify for free shipping
    return (
      <s-banner heading="Free Shipping Unlocked!" tone="success">
        <s-text>Shipping is free! Your order qualifies for free shipping.</s-text>
      </s-banner>
    );
  }
  
  // Show message telling them how much more they need to spend
  const formattedAmount = amountNeeded.toFixed(2);
  
  return (
    <s-banner heading="Free Shipping Available">
      <s-text>${formattedAmount} to go for FREE shipping.</s-text>
    </s-banner>
  );
}
