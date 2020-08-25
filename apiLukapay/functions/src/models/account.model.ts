interface AccountModel{
    Id:string
    Type:AccountType
    Password?:string
    Cvv?:string
    AccountNumber:string
    UserId:string
    Provider:string
    CurrencyCompte:Currency
}

enum AccountType{
    MOBILE_MONEY,
    CREDIT_CARD
}

enum Currency{
    USD,
    CDF
}