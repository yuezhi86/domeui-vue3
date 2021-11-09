export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type NoticeConfig = {
  top?: number;
  duration?: number;
};
export type GlobalConfig = {
  [key: string]: any;
  common?: CommonConfig;
  message?: NoticeConfig;
};
