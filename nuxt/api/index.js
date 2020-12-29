import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
const app = express()

import mailerSendHandler from './handlers/mailer/send.js'
import notificationsSubscribeHandler from './handlers/notifications/subscribe.js'
import notificationsPushHandler from './handlers/notifications/push.js'

app.use(bodyParser.json())
app.use(cookieParser())

app.post('/mailer/send', mailerSendHandler)
app.post('/notifications/subscribe', notificationsSubscribeHandler)
app.post('/notifications/push', notificationsPushHandler)

export default app
