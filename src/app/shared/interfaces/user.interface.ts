export interface IClient{
  _id:string;
  nom?:string;
  prenom?:string;
  role:string;
  email:string;
  phone:string;
  password:string;
  valid:boolean;
  poste:string;
}
