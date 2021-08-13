import { ProduitSimple } from "./produit-simple.model";

export class TarifUnitVar {
  _id?: String;
  tarifUHT?: Number;
  monnaie?: String;
  appToAllDistrs?: Boolean;
  concernDistrs?: String[];
  noConcernDistrs?: String[];
  appToAllZones?: Boolean;
  concernZones?: String[];
  noConcernZones?: String[];
  description?: String;
  commentaire?: String;
  produitService?: ProduitSimple;
}
