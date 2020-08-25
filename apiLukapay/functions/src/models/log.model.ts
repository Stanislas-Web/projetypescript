interface LogModel{
    Id:string
    Type:LogType
    Description:string
    UserId:string
}
enum LogType{
    APPLICATION_NAVIGATION,
    PERFORM_TRANSACTION,
    CHANGE_USER_NAME,
    CHANGE_PHOTO,
    LOCALISATION_CHANGED,
    NEW_SMS_COMED,
    BALANCE_CHANGED,
    QUIT_APPLICATION,
    BALANCE_SHOW
}