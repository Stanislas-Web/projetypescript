interface TrasanctionModel{
    Id: string
    UserId: string
    AccountId: string
    Amount: number
    Description: number
    Destination: string
    Type:TransactionType
    Status:TransactionStatus
}

enum TransactionType{
    SHOPPING,
    TRANSFERT_MONEY,
    SCHEDULING,
    DEPOT
}

enum TransactionStatus{
    INITIATED,
    INPROCESS,
    APPROVE,
    DECLINED
}











