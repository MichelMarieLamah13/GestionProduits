import { InstCaractVar } from "./inst-caract-var.model";
import { ProduitSimple } from "./produit-simple.model";

export class IndFraisAdd {
  _id?: String;
  refFrais?: String;
  fraisAddCond?: Boolean;
  natureCoutAdd?: String;
  valeurCoutAdd?: Number;
  promoNouv?: Boolean;
  appToAllDistrs?: Boolean;
  concernDistrs?: String[];
  noConcernDistrs?: String[];
  appToAllZones?: Boolean;
  concernZones?: String[];
  noConcernZones?: String[];
  description?: String;
  commentaire?: String;
  insCaractVar?: InstCaractVar[];
  produitService?: ProduitSimple;
}
