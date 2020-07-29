export class User {
    constructor(
    //   public firstName: string,
    //   public lastName: string,
      public name: string,
      public email: string,
      public mobile:string,
      public password: string,
      public confirmPassword: string,
     public id:string
    ) { }
  }
  export interface UserData {
 
    name: string;
    email: string;
    mobile:string,
    password: string,
  }
  