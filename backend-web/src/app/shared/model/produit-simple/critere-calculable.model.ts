import { ProduitSimple } from "./produit-simple.model"

export class CritereCalculable {
  _id?:String;
  groupeCritere?: Number;
  refCritere?: String;
  label?: String;
  valeur?: String;
  uniteValeur?: String;
  produit?:ProduitSimple;
}
