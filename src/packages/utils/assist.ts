import {CheckboxValue} from '../components/checkbox';

export function getUncheckedDefaultValue(
  trueValue: CheckboxValue,
  falseValue: CheckboxValue
) {
  switch (typeof trueValue) {
    case 'number':
      return typeof falseValue === 'number' ? falseValue : '';
    case 'string':
      return falseValue || '';
    case 'boolean':
      return false;
  }
}

export function getSizeOrPx(value: string | number): string {
  return Number.isNaN(Number(value)) ? `${value}` : `${value}px`;
}

export function toFixed(
  value: number | string | null | undefined,
  n = 0
): string {
  if (value === undefined || value === null) return '';
  // 不是数字，则直接返回 value
  if (typeof value === 'string' && !/^\d+(\.\d+)?$/.test(value)) return value;

  const dot = n ? '.' : '';
  const valueSplit = String(value).split('.');
  const integer = valueSplit[0];
  let decimal = valueSplit[1];

  // 如果 n 是 0 则直接返回整数部分
  if (!n) return integer;

  if (valueSplit.length === 1) {
    return `${integer}${dot}${new Array(n).fill('0').join('')}`;
  }

  if (decimal.length < n) {
    decimal += new Array(n - decimal.length).fill('0').join('');
  }

  return `${integer}${dot}${decimal.substr(0, n)}`;
}
