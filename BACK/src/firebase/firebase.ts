import admin from 'firebase-admin'
import servicekey from './servicekey.json'

const initFirebaseAdmin = () => {
    admin.initializeApp({ credential: admin.credential.cert(servicekey as unknown as string) })
    return admin
}

export { initFirebaseAdmin }
