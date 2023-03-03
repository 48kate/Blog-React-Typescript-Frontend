export default interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    roles?: Array<string>
  }