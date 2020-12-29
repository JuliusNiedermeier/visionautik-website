export default () => {
  window.onNuxtReady(async () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  })
}
