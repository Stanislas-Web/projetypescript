// tslint:disable-next-line: no-implicit-dependencies
import { db, dateAdmin, functionDate } from '@enironement/db.config';


export const Select = (collectionName: string)=>{
    return db.collection(`${collectionName}`).get();
}


export const SelectOne = (collectionName: string, idDocument:string)=>{
    return db.collection(`${collectionName}`).doc(idDocument).get();
}


export const Insert = (collectionName: string, data:any)=>{ 
    return db.collection(`${collectionName}`).add(data);
}


export const Update = (collectionName: string, idDocument:string, data:any)=>{
    return db.collection(`${collectionName}`).doc(idDocument).set(data, { merge: true });
}


export const Delete = (collectionName: string, idDocument:string)=>{
    return db.collection(`${collectionName}`).doc(idDocument).delete();
}



  

