import Firestore from '@google-cloud/firestore'
import dotenv from 'dotenv'
dotenv.config()

const db = new Firestore({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

export default db.collection('notification-subscriptions')
