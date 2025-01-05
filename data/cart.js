export const cart = [];

export function addToCart(productId){

  let quantitySelector = document.querySelector(`.js-selector${productId}`);

  let quantity = Number(quantitySelector.value);

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity
    });
  }
}