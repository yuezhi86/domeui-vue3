import {CheckboxValue} from '../types';

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
