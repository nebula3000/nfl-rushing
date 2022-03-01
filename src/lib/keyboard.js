export function isNumber(e) {
  if (
    e.code === 'Backspace' ||
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight'
  ) {
    return
  }

  if (e.keyCode === 13) {
    e.preventDefault()
    e.currentTarget.blur()
  } else if (isNaN(Number(e.key))) {
    e.preventDefault()
  }
}

export function isEnterKey(event) {
  return event.key === 'Enter'
}
