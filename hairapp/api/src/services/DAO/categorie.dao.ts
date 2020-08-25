import { Insert, DeleteAnd, DeleteOr, SelectWhereAnd, SelectWhereOr, Limit, Update, Select } from "./connection";
import { queryCallback } from "mysql";

export class CategorieDAO {
    private tableName = "categorie";
    private idColumn="Id";
    private static _instance: CategorieDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new CategorieDAO();
        }
        return this._instance;
    }
    public all(func: queryCallback) {
        Select(this.tableName,func);
    }
    public save(data: ProduitModel, func: queryCallback){
        Insert(this.tableName, data, func);
    }
    public deleteAnd(data: ProduitModel, func: queryCallback){
        DeleteAnd(this.tableName, data, func);
    }
    public deleteOr(data: ProduitModel, func: queryCallback){
        DeleteOr(this.tableName, data, func)
    }
    public whereAnd(data: ProduitModel, func: queryCallback){
        SelectWhereAnd(this.tableName, data, func);
    }
    public whereOr(data: ProduitModel, func: queryCallback){
        SelectWhereOr(this.tableName, data, func);
    }
    public limit(lim: string, func: queryCallback){
        Limit(this.tableName, lim, func);
    }
    public update(data: ProduitModel, func: queryCallback)
    {
       Update(this.tableName, data, this.idColumn, (data as any)[this.idColumn], func);
    }
}