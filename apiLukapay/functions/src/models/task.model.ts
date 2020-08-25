interface TaskModel{
    Id: string
    Type: TaskType
    Description: string

}

enum TaskType{
    ONE_TIME,
    EBDOMADAIRE,
    MENSUAL
}