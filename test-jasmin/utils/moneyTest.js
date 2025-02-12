import { formatCurrency } from"../../script/utils/money.js";

describe('test suit: formatCurrency', () => {
  it('It works with 20.95?', () => {
    expect(formatCurrency(2095)).toEqual('20.95')
  });
});

it('it works with 0', () => {
  expect(formatCurrency(0)).toEqual('0.00')
});

it('It will round nearest number', () => {
  expect(formatCurrency(2000.5)).toEqual('20.01')
});