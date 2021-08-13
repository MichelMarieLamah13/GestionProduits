import { ProduitSimple } from "./produit-simple.model";

export class ProduitComposant {
  _id?:String;
  typeProduit?: String;
  qteProduit?: Number;
  uniteQte?: Number;
  refProdComposant?: ProduitSimple;
  refProduitComposeur?: ProduitSimple;
}
