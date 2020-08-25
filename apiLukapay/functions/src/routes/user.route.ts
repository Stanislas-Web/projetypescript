import express from 'express';
// tslint:disable-next-line: no-implicit-dependencies
import { UserDAO } from "@services/DAO/user.dao";
export class UserRoute {
    private static _instance: UserRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new UserRoute();
        }
        return this._instance;
    }
    public async get(req: express.Request, res: express.Response){

        try{
            const resultats = await UserDAO.instance.all();
            const voirData:any = [];
            resultats.forEach((user)=>{
                voirData.push({
                    id: user.id,
                    nom: user.data().nom,
                    photo: user.data().photo,
                    localisation: user.data().localisation,
                    deviceMark: user.data().deviceMark,
                    osVersion: user.data().osVersion,
                    deviceSerial: user.data().deviceSerial,
                    deviceRegistration: user.data().deviceRegistration,
                    createdAt: user.data().createdAt.toDate() 
                })
            })
            res.send(voirData)
            
          

        }catch(err){
            res.status(500).send(err);
        }
    }




    public async getOne(req: express.Request, res: express.Response){

        try{
            const userId: string = req.params.id;
            const recuperationData:any = await UserDAO.instance.getOne(userId);
            res.send({
                id: recuperationData.id,
                nom: recuperationData.data().nom,
                photo: recuperationData.data().photo,
                localisation: recuperationData.data().localisation,
                deviceMark: recuperationData.data().deviceMark,
                osVersion: recuperationData.data().osVersion,
                deviceSerial: recuperationData.data().deviceSerial,
                deviceRegistration: recuperationData.data().deviceRegistration,
                createdAt: recuperationData.data().createdAt.toDate() 
            });

        }catch(err){
            res.status(500).send(err);
        }
    }

    public async post(req: express.Request, res: express.Response){
        try{

            const data:any = await UserDAO.instance.save(req.body);
            res.status(201).send({
                id:data.id
            })
            
    
        }catch(error){
            res.status(500).send(error);
        }
    }

    public async update(req:express.Request, res: express.Response){
        try{
            const userId: string = req.params.id;
            const data = await UserDAO.instance.update(req.body, userId);
            res.status(201).json(data)
            

        }catch(error){
            res.status(500).send(error);
        }
    }

    public async delete(req:express.Request, res: express.Response){
        try{
            
            const userId: string = req.params.id;


            await UserDAO.instance.delete(userId);
            res.status(201).send({
                id:userId
            });

        }catch(error){
            res.status(500).send(error);
        }
    }



}