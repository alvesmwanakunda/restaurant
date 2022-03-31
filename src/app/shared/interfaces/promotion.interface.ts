export interface PromotionInterface {
    id: string;
    nom: string;
    types: [];
    sms: string;
    email: string;
    photo: string;
    cible: string;
    critere: string;
    jours: Date;
    heure: string;
    condition: string;
    interval1: Number;
    interval2: Number;
    age1: Number;
    age2: Number;
    sexe: string;
    region: [];
    zone: [];
    nombre: Number;
    dateEnvoie:Date;
  }