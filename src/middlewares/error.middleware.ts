export class ErrorHandler extends Error {
    private statusCode;
    constructor(message : string , statusCode : number) {
        super(message)    
        this.statusCode = statusCode;
    }
}