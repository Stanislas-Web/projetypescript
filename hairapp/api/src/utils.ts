export class Utility {
    public static asQuerry(query: any): boolean{
        let asQuerry =  false;
        for (const key in query) {
            if (query.hasOwnProperty(key)) { 
                asQuerry = true;
            }
        }
        return asQuerry;
    }
    public static getObjectAttributeNumber(object: any){
        let inc = 0;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                inc++;
            }
        }
        return inc;
    }
}