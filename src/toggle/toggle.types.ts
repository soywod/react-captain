export type Toggle = (defaultValue?: any) => ToggleState
export type ToggleState = [boolean, (toggler?: any) => void]
