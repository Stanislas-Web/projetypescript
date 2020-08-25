import express from 'express';
// import { Utility } from "../utils";
import { UserDAO } from "@services/DAO/user.dao";

export class UserRoute {
    private static _instance: UserRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new UserRoute();
        }
        return this._instance;
    }

    public get(req: express.Request, res: express.Response){
        if (Utility.getObjectAttributeNumber(req.query) > 0) {
            UserDAO.instance.whereAnd(req.query, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        if (req.params.id) {
            UserDAO.instance.whereAnd({Id: req.params.id}, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        UserDAO.instance.all((error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public post(req: express.Request, res: express.Response){
        UserDAO.instance.save(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public delete(req: express.Request, res: express.Response){
        UserDAO.instance.deleteAnd({Id: req.params.id},(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public update(req: express.Request, res: express.Response){
        UserDAO.instance.update(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
}