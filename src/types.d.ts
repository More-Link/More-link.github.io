export type MaybePromiseFn<V> = V | (() => Promise<{ default: V }>)
