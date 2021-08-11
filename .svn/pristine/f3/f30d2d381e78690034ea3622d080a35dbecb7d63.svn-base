const PLATFORM = 'jrcn_console'

export const setItem = (name, content) => {
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(`${PLATFORM}_${name}`, content)
}

export const getItem = name => {
  return window.localStorage.getItem(`${PLATFORM}_${name}`)
}

export const removeItem = name => {
  window.localStorage.removeItem(`${PLATFORM}_${name}`)
}

export const clear = () => {
  let storage = window.localStorage
  for (let key in storage) {
    if (key.indexOf(PLATFORM) > -1) {
      window.localStorage.removeItem(key)
    }
  }
}
