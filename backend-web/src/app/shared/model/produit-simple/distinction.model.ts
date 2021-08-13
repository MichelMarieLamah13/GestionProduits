import { ProduitSimple } from "./produit-simple.model";

export class Distinction {
  _id?:String;
  typeDistinction?: String;
  designation?: String;
  logo?: String;
  dateObtention?: Date;
  duree?: Number;
  uniteDuree?: String;
  produit?: ProduitSimple;
}
