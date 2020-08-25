import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as functions from 'firebase-functions';
// tslint:disable-next-line: no-import-side-effect
import 'module-alias/register';
// tslint:disable-next-line: no-implicit-dependencies
import { router } from '@routes/index';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as admin from 'firebase-admin';
// *developpement mode


// *production mode
// const PORT = 80; 

const app = express();
const app2 = express();
// body middleware bodyParser
// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({extended: true}));
// tslint:disable-next-line: deprecation
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'), {}))
// cors middleware
app.use(cors()); 

app.use('/swagger', swaggerUi.serve);
app.get('/swagger', swaggerUi.setup(swaggerDocument));
// Authorization middleware

// app.use(function (req, res, next) { 
//     if (req.headers['authorization'] == "dbgeneratetoken") {
//         next();
//     }
//     else {
//         res.status(401);
//         res.json({error: 'unautorized'});
//     }
// });


// routing middleware

app.use(router); 
app2.use(express.static(path.join(__dirname,'public')));
app2.get('**', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

/**
 * cloud functions
 */ 

exports.userCreatedDate = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    return snap.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });


  exports.contactCreatedDate = functions.firestore
  .document('contacts/{contactId}')
  .onCreate((snap, context) => {
    return snap.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });



export const api = functions.https.onRequest(app)


