export function getTheme() {
  return document.querySelector('html')?.classList.contains('dark')
    ? 'dark'
    : 'light'
}

export function onDidChangeTheme(callback:(theme:'dark'|'light')=>void) {
  const root = document.querySelector('html')

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        if (root?.classList.contains('dark')) {
          callback('dark')
        } else {
          callback('light')
        }
      }
    }
  })
  if(root){
    observer.observe(root, { attributes: true })
  }
  
  return () => {
    observer.disconnect()
  }
}

export function toggleTheme() {
  console.log("---toggleTheme-----")
  const root = document.querySelector('html')
  if(root){
    root.classList.add('disable-transitions')
    if (root.classList.contains('dark')) {
      root.classList.remove('dark')
      try {
        window.localStorage.setItem('theme', 'light')
      } catch (_) {}
    } else {
      root.classList.add('dark')
      try {
        window.localStorage.setItem('theme', 'dark')
      // deno-lint-ignore no-empty
      } catch (_) {}
    }
    // deno-lint-ignore no-window-prefix
    window.setTimeout(() => {
      root.classList.remove('disable-transitions')
    }, 0)
 }
}
