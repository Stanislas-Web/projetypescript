import { ProduitDAO } from "@services/DAO/produit.dao";
import express from 'express';
import { Utility } from "../utils";
export class ProduitRoute {
    private static _instance: ProduitRoute;
    public static get instance() {
        if (!this._instance) {
            this._instance = new ProduitRoute();
        }
        return this._instance;
    }
    public get(req: express.Request, res: express.Response){
        if (Utility.getObjectAttributeNumber(req.query) > 0) {
            ProduitDAO.instance.whereAnd(req.query, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        if (req.params.id) {
            ProduitDAO.instance.whereAnd({Id: req.params.id}, (error, results)=>{
                if (error) { res.send({error}); return;}
                res.send(results);
            });
            return;
        }
        ProduitDAO.instance.all((error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public post(req: express.Request, res: express.Response){
        ProduitDAO.instance.save(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public delete(req: express.Request, res: express.Response){
        ProduitDAO.instance.deleteAnd({Id: req.params.id},(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
    public update(req: express.Request, res: express.Response){
        ProduitDAO.instance.update(req.body,(error, results)=>{
            if (error) { res.send({error}); return;}
            res.send(results);
        });
    }
}