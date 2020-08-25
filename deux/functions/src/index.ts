import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import cors from 'cors';
import {check,validationResult} from 'express-validator'

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({ origin: true }));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const validation:any =[
        check('userName',"le nom ne doit être une chaine de caractère et  > 20 caractères").isString().isLength({ max: 20 }),
        check("phoneNumber","Votre numero de téléphone ne doit pas depasser 13 caractères ").isString().isLength({ max: 13 }),
        check('email',"Votre adresse Email n'est pas valide").isEmail()
]



app.get("/contacts", async(req:express.Request, res:express.Response)=>{
    try {

        const recuperationData = await db.collection("contacts").get();

        const voirData:any = [];
        recuperationData.forEach((element)=>{
            voirData.push({
                id          :element.id,
                userName    :element.data().userName,
                phoneNumber :element.data().phoneNumber,
                email       :element.data().email,
                createdAt   :element.data().createdAt.toDate()
            })
        })
        res.send(voirData)
        
    } catch (error) {
        res.status(500).send(error);
        
    }

})


app.get("/contacts/:id", async(req:express.Request, res:express.Response)=>{
    try {
        const contactId: string = req.params.id;
        const recuperationData:any = await db.collection("contacts").doc(contactId).get();
        res.send({
            id          :recuperationData.id,
            userName    :recuperationData.data().userName,
            phoneNumber :recuperationData.data().phoneNumber,
            email       :recuperationData.data().email,
            createdAt   :recuperationData.data().createdAt.toDate() 
        });
        
    } catch (error) {
        res.status(500).send(error);
        
    }

})



app.post("/contacts",validation, async (req:express.Request, res:express.Response) => {


    try{
  
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        const contact: any ={
            userName:req.body['userName'],
            phoneNumber:req.body['phoneNumber'],
            email:req.body['email']
        }

        await db.collection("contacts").add(contact);
        res.status(201).json({
            contact
        })

    }catch(error){
        res.status(500).send(error);
    }

});


app.put("/contacts/:id", validation ,async(req:express.Request, res:express.Response)=>{
    try{
        const contactId: string = req.params.id;
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        const contact: any ={
            userName:req.body['userName'],
            phoneNumber:req.body['phoneNumber'],
            email:req.body['email']
        }

        await db.collection("contacts").doc(contactId)
        .set(contact, { merge: true });
        res.status(201).json({
            id: contactId,
            contact
        });

    }catch(error){
        res.status(500).send(error);
    }
})

app.delete("/contacts/:id", async(req:express.Request, res:express.Response)=>{
    try{
        const contactId: string = req.params.id;

        await db.collection('contacts')
        .doc(contactId)
        .delete();
        res.status(201).send("contact Supprimé!").json({
            id:contactId
        })
        

    }catch(error){
        res.status(500).send(error);
    }
})

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




export const http = functions.https.onRequest(app)



