import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from 'body-parser';

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post("/contacts", async (req:express.Request, res:express.Response) => {
    try{
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




app.get("/contacts", async(req:express.Request, res:express.Response)=>{
    try {

        const recuperationData = await db.collection("contacts").get();

        const voirData:any = [];
        recuperationData.forEach((element)=>{
            voirData.push({
                id:element.id,
                data:element.data()
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
        const recuperationData = await db.collection("contacts").doc(contactId).get();
        res.send(recuperationData);
        
    } catch (error) {
        res.status(500).send(error);
        
    }

})


app.put("/contacts/:id", async(req:express.Request, res:express.Response)=>{
    try{
        const contactId: string = req.params.id;

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

  exports.contactUpdatedDate = functions.firestore
  .document('conatcts/{contactId}')
  .onUpdate((change, context) => {
    return change.after.ref.set(
      {
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });



export const http = functions.https.onRequest(app)



