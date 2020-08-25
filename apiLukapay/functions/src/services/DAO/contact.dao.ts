import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class ContactDAO {
    private collectionName = "contacts";
    private static _instance: ContactDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new ContactDAO();
        }
        return this._instance;
    }
    public all() {
        return Select(this.collectionName);
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: ContactModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: ContactModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}