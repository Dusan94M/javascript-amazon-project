import { formatCurrency } from"../script/utils/money.js";

console.log('test suit: formatCurrency');

console.log('It works with 20.95?');

if(formatCurrency(2095) === '20.95'){
  console.log('passed')
}else{
  console.log('failed');
}

console.log('It works with 0?')

if(formatCurrency(0) === '0.00'){
  console.log('passed')
}else{
  console.log('failed');
}

console.log('It will round nearest number?')

if(formatCurrency(2000.5) === '20.01'){
  console.log('passed')
}else{
  console.log('failed');
}

