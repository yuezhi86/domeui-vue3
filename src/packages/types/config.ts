export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type MessageConfig = {
  top?: number;
  duration?: number;
};
export type GlobalConfig = {
  [key: string]: any;
  common?: CommonConfig;
  message?: MessageConfig;
};
