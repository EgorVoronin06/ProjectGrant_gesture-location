export type DeepPartialObject<T> = T extends object
  ? T extends Array<infer U>
  ? Array<DeepPartialObject<U>>
  : { [P in keyof T]: DeepPartialObject<T[P]> }
  : T | undefined;