/**
 * A `useState` for booleans.
 *
 * @param defaultVal The default value
 * @returns ToggleState
 */
export type UseToggle = (defaultVal?: any) => ToggleState

/**
 * Alias for `useState<boolean>`
 */
export type ToggleState = [boolean, (val?: any) => void]
