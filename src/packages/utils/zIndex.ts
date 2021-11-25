import {getConfig} from '@/packages/config';

let de_zIndex: number;

export function getIndexZ(): number {
  de_zIndex = de_zIndex ?? (getConfig().common.zIndex as number);
  return de_zIndex++;
}
