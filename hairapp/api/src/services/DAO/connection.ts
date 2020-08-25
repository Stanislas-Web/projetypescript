import { createConnection, queryCallback } from "mysql";
import { config } from '@enironement/db.config';
import { Utility } from "../../utils";

export var dbconnection = createConnection(config);

export var SelectWhereOr = (tableName: string, data: any, func: queryCallback )=>{
    let sql = `SELECT * FROM ${tableName} WHERE `;
    let inc = 0;
    let insertValue = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (inc!==0) {
                sql += " || ";
            }
            sql += key + "= ?" ;
            insertValue.push((data as any)[key])
            inc++;
        }
    }
    if (sql!==`SELECT * FROM ${tableName} WHERE `) {
        if (inc > 1) {
            sql=sql.replace(sql[sql.length], "") + ")";
        }
    }
    dbconnection.query(sql,insertValue, func);
}
export var SelectWhereAnd = (tableName: string, data: any, func: queryCallback )=>{
    let sql = `SELECT * FROM ${tableName} WHERE `;
    let inc = 0;
    let insertValue = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (inc!==0) {
                sql += " && ";
            }
            sql += key + "= ?" ;
            insertValue.push((data as any)[key])
            inc++;
        }
    }
    dbconnection.query(sql,insertValue, func);
}
export var Insert = (tableName: string, data: any, func: queryCallback )=>{
    let sql = `INSERT INTO ${tableName} VALUES(`;
    let insertValue = [];
    let inc = 0;
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            sql +=(Utility.getObjectAttributeNumber(data)!== (++inc)) ? "?,": "?";
            insertValue.push((data as any)[key])
        }
    }
    if (sql!==`INSERT INTO ${tableName} VALUES(`) {
        sql=sql.replace(sql[sql.length], "") + ")";
    }
    console.log(sql, insertValue);
    
    dbconnection.query(sql,insertValue, func);
}
export var Select = (tableName: string, func: queryCallback )=>{
    dbconnection.query(`SELECT * FROM ${tableName}`, func);
}
export var Clear = (tableName: string,  func: queryCallback )=>{

}
export var Last = (tableName: string, column: string, limit: string,  func: queryCallback )=>{
    dbconnection.query(`SELECT * FROM ${tableName} order by ${column} desc  limit ${limit};`, func);
}

export var Limit = (tableName: string, lim: string,  func: queryCallback )=>{
    let sql = `SELECT * FROM ${tableName} limit ${lim} `;
    dbconnection.query(sql, func);
}

export var DeleteAnd = (tableName: string, data: any, func: queryCallback)=>{
    let sql = `DELETE FROM ${tableName} WHERE `;
    let inc = 0;
    let insertValue = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            sql += key + "= ?" ;
            if (Utility.getObjectAttributeNumber(data)!== (++inc)) {
                sql += " && ";
            }
            insertValue.push((data as any)[key]);
        }
    }
    dbconnection.query(sql,insertValue, func);
}
export var Update = (tableName: string, data: any, idColumn: string, idValue: string, func: queryCallback)=>{
    let sql = `UPDATE ${tableName} SET `;
    let val = `WHERE ${idColumn}='${idValue}'`;
    let inc = 0;
    let insertValue = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (idColumn.toLocaleLowerCase() !== key.toLocaleLowerCase()) {
                ++inc;
                sql += key + "= ?" ;
                if (inc!==0 || Utility.getObjectAttributeNumber(data)!== (inc+1)) {
                        sql += ",";
                }
                insertValue.push((data as any)[key]);
            }
        }
    }
    dbconnection.query(sql.slice(0,sql.length-1 )+ " " + val,insertValue, func);
}

export var DeleteOr = (tableName: string, data: any, func: queryCallback)=>{
    let sql = `SELECT * FROM ${tableName} WHERE `;
    let inc = 0;
    let insertValue = []
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (inc!==0) {
                sql += " || ";
            }
            sql += key + "= ?" ;
            insertValue.push((data as any)[key])
            inc++;
        }
    }
    if (sql!==`SELECT * FROM ${tableName} WHERE `) {
        if (inc > 1) {
            sql=sql.replace(sql[sql.length], "") + ")";
        }
    }
    dbconnection.query(sql,insertValue, func);
}