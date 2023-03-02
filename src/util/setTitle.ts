import { appName } from '../consts'

export function setTitle(str?: string) {
  if (str) {
    document.title = `${str} | ${appName}`
  } else {
    document.title = appName
  }
}
