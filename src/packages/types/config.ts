export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type NoticeConfig = {
  margin?: number;
  duration?: number;
};
export type MessageConfig = NoticeConfig & {};
export type GlobalConfig = {
  [key: string]: any;
  common?: CommonConfig;
  notice?: NoticeConfig;
  message?: MessageConfig;
};
