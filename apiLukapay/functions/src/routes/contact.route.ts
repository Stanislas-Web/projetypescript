import express from 'express';
// tslint:disable-next-line: no-implicit-dependencies
import { ContactDAO } from "@services/DAO/contact.dao";
export class ContactRoute {
    private static _instance: ContactRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new ContactRoute();
        }
        return this._instance;
    }
    public async get(req: express.Request, res: express.Response){


        try{
            const resultats = await ContactDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((contact)=>{
                voirData.push({
                    id: contact.id,
                    userName: contact.data().userName,
                    phoneNumber: contact.data().phoneNumber,
                    userId: contact.data().userId,
                    displayName: contact.data().displayName,
                    createdAt: contact.data().createdAt.toDate() 
                })
            })
            res.send(voirData)

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const ContactId: string = req.params.id;
            const recuperationData:any = await ContactDAO.instance.getOne(ContactId);
            res.send({
                id: recuperationData.id,
                userName: recuperationData.data().userName,
                phoneNumber: recuperationData.data().phoneNumber,
                userId: recuperationData.data().userId,
                displayName: recuperationData.data().displayName,
                createdAt: recuperationData.data().createdAt.toDate() 
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await ContactDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const ContactId: string = req.params.id;
            const data = await ContactDAO.instance.update(req.body, ContactId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const ContactId: string = req.params.id;


            await ContactDAO.instance.delete(ContactId);
            res.status(201).send({
                id:ContactId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }



}