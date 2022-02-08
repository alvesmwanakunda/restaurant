import { IClient } from "./user.interface";
export interface ISession{
  token: string;
  user: IClient;
}
