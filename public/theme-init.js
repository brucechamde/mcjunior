// Apply the saved or device theme before first paint, so there is no flash.
;(function () {
  var theme = 'dark'
  try {
    var saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') theme = saved
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light'
  } catch {}
  document.documentElement.setAttribute('data-theme', theme)
  var meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'light' ? '#fbf8ff' : '#0f0724')
})()
