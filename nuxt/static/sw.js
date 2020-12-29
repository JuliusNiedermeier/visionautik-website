self.addEventListener('push', function (event) {
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      image: data.image,
      icon: data.icon,
      badge: data.badge,
    })
  )
})
