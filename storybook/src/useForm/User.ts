export type Civility = 'Mrs' | 'Mr' | 'Ms' | 'Doctor' | 'Lord'

export type User = {
  civility: Civility | null
  fullName: string | null
  phone: number | null
  isMarried: boolean | null
}

export const defaultUser: User = {
  civility: null,
  fullName: null,
  phone: null,
  isMarried: null,
}
