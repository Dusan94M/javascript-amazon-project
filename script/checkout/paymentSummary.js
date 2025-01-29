import { cart } from'../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { fromatCurrency } from '../utils/money.js';
 
export function renderPaymentSummary(){
  
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach( (cartItem) => {
    let product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;

  });

  let totalBeforeInCents = productPriceCents + shippingPriceCents;
  let taxCents = totalBeforeInCents * 0.1;
  let totalCents = totalBeforeInCents + taxCents;

  const paymentSummary = `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${fromatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${fromatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${fromatCurrency(totalBeforeInCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${fromatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${fromatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSummary;
}