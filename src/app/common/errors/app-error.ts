export class AppError{
  constructor(public originalError?: any){
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
