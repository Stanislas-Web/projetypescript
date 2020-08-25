import { Select,Insert,Update,Delete, SelectOne } from "./connection";


export class UserDAO {
    private collectionName = "users";
    private static _instance: UserDAO;
    public static get instance() {
        if (!this._instance) {
            this._instance = new UserDAO();
        }
        return this._instance;
    }
    public all() {
       return  Select(this.collectionName);
      
    }

    public getOne(params:string) {
        return SelectOne(this.collectionName,params);
    }
    
    public save(data: UserModel ){
        return Insert(this.collectionName, data);
    }


    public update(data: UserModel, params: string ){
        return Update(this.collectionName,params, (data as any));
    }

    public delete(params:string){
        return Delete(this.collectionName,params);
    }


}