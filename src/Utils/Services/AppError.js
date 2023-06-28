

export class AppError extends Error{
    constructor(message,StatusCode){
        super(message)
        this.message = message
        this.StatusCode = StatusCode;
    }
}