// T will be typeof Object as const
// const BUTTON_TYPE = {X: X} as const (follow enum font style)
// const ButtonType = ObjectValues<typeof BUTTON_TYPE>
declare type ObjectValues<T> = T[keyof T];
