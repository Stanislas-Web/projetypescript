import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();
export const dateAdmin = admin.firestore;
export const functionDate = functions.firestore;