import { atom } from 'recoil'

export const darkModeState = atom({
  key: 'darkModeState',
  default: false,
})

export const mutedState = atom({
  key: 'mutedState',
  default: false,
})