const url = new URL(window.location.href);
url.pathname
console.log(url.searchParams.get('orderId'))
console.log(url.searchParams.get('productId'))

function calculatePercentage(){
  return ((currentTime - orderTime) / (deliveryTime - orderTime))
}