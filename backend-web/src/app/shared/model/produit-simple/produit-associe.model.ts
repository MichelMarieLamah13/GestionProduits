import { ProduitSimple } from "./produit-simple.model";

export class ProduitAssocie {
  _id?: String;
  typeAssociation: String;
  produitService1: ProduitSimple;
  produitService2: ProduitSimple;
}
