import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from'../../data/cart.js'
import { products, getProduct } from "../../data/products.js";
import { fromatCurrency } from'../utils/money.js';
import  dayjs from'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary(){
    
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;

    let matchingProducts = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId)

    let dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML +=`
    <div class="cart-item-container 
    js-cart-item-container-${matchingProducts.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProducts.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProducts.name}
          </div>
          <div class="product-price">
            $${fromatCurrency(matchingProducts.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProducts.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProducts.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProducts.id}">
            <span class="save-quantity-link link-primary js-save" data-product-id="${matchingProducts.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProducts.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

            ${deliveryOptionsHTML(matchingProducts, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProducts,cartItem){

    let deliveryOptionhtml = '';
    
    deliveryOptions.forEach((deliveryOption) => {
      let dateString = calculateDeliveryDate(deliveryOption);

      
      let price = deliveryOption.priceCents === 0 ? 'Free': `$${fromatCurrency(deliveryOption.priceCents)}-`;

      let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryOptionhtml += `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts.id}"
          data-delivery-option-id="${deliveryOption.id}"
          >
            <input type="radio"
            ${isChecked ? 'checked': ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProducts.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
              ${price} - Shipping
              </div>
            </div>
          </div>
      `;
    });
    
    return deliveryOptionhtml;
  }

  document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {

    let productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    renderPaymentSummary();
    renderOrderSummary();
    renderCheckoutHeader();
    });
  });

  function updateCartQuantity(){
      const cartQuantity = calculateCartQuantity();

      renderCheckoutHeader(cartQuantity);

    }

  updateCartQuantity();

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      console.log(productId);
    
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save').forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      
      let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      let newQuantity = Number(quantityInput.value);
      
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      
      updateQuantity(productId, newQuantity);
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      let {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();