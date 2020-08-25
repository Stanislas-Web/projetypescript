interface UserModel{
    Id: string
    Nom: string
    Photo:string
    Localisation:{
        Latitude: number
        Longitude: number
    }
    DeviceMark:string
    OsVersion:string
    DeviceSerial:string
    DeviceRegistration:string
}