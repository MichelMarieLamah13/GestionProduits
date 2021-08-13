import { ProduitSimple } from "./produit-simple.model";

export class InstCaract {
  _id?:String;
  refInstCaracterist?:String;
  affichagePrive?:Boolean;
  groupeCaracterist?:String;
  labelCaracterist?:String;
  valeurCaracterist?:String;
  uniteCaracterist?:String;
  ordreCaracterist?:Number;
  coutAdditionnel?:Boolean;
  typeCoutAdditionnel?:String;
  valeurCoutAdditionnel?:Number;
  produitService?: ProduitSimple
}
