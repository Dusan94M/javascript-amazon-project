import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  let remainingDay = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while(remainingDay > 0){
    deliveryDate = deliveryDate.add(1, 'day');
    if(!isWeekend(deliveryDate)){
      remainingDay--;
    }
  }
  const dateString = deliveryDate.format('dddd MMMM d');
  return dateString;
}


export function isWeekend(date){
  let dateOfaWeek = date.format('dddd')
  return dateOfaWeek === 'Sunday' || dateOfaWeek === 'Saturday';
}
