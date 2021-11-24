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
