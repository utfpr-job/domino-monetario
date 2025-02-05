export const moneyValues: MoneyValue[] = [
  '200',
  '100',
  '50',
  '20',
  '10',
  '5',
  '2',
  '1',
  '0.5',
  '0.25',
  '0.1',
  '0.05',
  '0',
];

export const numberToMoneyValue = {
  200: '200',
  100: '100',
  50: '50',
  20: '20',
  10: '10',
  5: '5',
  2: '2',
  1: '1',
  0.5: '0.5',
  0.25: '0.25',
  0.1: '0.1',
  0.05: '0.05',
  0: '0',
}

const DOMINOS: Domino[] = [];

for (let i = 0; i < moneyValues.length; i++) {
  for (let j = i; j < moneyValues.length; j++) {
    DOMINOS.push([moneyValues[i], moneyValues[j]]);
  }
}

Object.freeze(DOMINOS);

export default DOMINOS;
