import { atom } from 'recoil'

const postDialogState = atom({
  key: 'postDialog',
  default: false,
})

const switchProfileDialogState = atom({
  key: 'switchProfileDialog',
  default: false,
})

export { postDialogState, switchProfileDialogState }
