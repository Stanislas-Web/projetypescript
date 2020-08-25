import express from 'express';
import { Utility } from "../utils";
import { CategorieDAO } from "@services/DAO/categorie.dao";
export class CategorieRoute {
    private static _instance: CategorieRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new CategorieRoute();
        }
        return this._instance;
    }
    public get(req: express.Request, res: express.Response){
        if (Utility.getObjectAttributeNumber(req.query) > 0) {
            CategorieDAO.instance.whereAnd(req.query, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        if (req.params.id) {
            CategorieDAO.instance.whereAnd({Id: req.params.id}, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        CategorieDAO.instance.all((error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public post(req: express.Request, res: express.Response){
        CategorieDAO.instance.save(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public delete(req: express.Request, res: express.Response){
        CategorieDAO.instance.deleteAnd({Id: req.params.id},(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public update(req: express.Request, res: express.Response){
        CategorieDAO.instance.update(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
}