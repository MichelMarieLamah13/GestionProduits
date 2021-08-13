import { ProduitSimple } from "./produit-simple.model";

export class GrilleTarifaire {
  _id?: String;
  qteInf?: Number;
  qteSup?: Number;
  tarifUHT?: Number;
  gainPU?: Number;
  commentaire?: String;
  monnaie?: String;
  appToAllDistrs?: Boolean;
  concernDistrs?: String[];
  noConcernDistrs?: String[];
  appToAllZones?: Boolean;
  concernZones?: String[];
  noConcernZones?: String[];
  produit?: ProduitSimple;
}
