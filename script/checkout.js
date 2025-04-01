import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from '../data/cart.js';
//import {Cart} from '../data/cart-class.js';
//import { Car } from"../data/car.js";
//import'../data/backend-practice.js';

async function loadPage(){
 try{
//  throw 'error1';
  await loadCartFetch();
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ])
 } 
 catch(error){
  console.log('Unexpected error, please try again!');
 }

  
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

*/

/* 
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value 1');
  });

}).then((value) => {
  console.log(value)
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}); 
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  })
});
*/