export type Toggle = (defaultVal?: any) => ToggleState
export type ToggleState = [boolean, (val?: any) => void]
