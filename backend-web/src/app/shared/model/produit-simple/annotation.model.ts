import { ProduitSimple } from "./produit-simple.model";

export class Annotation {
  _id?:String;
  date?: Date;
  email?: String;
  commentaire?: String;
  note?: Number;
  produit?: ProduitSimple;
}
