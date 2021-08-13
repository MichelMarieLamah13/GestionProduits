import { InstCaract } from "./inst-caract.model";
import { ProduitSimple } from "./produit-simple.model";

export class IndPromo {
  refOffre?: String;
  prodDirectConcer?: Boolean;
  promoNouv?: Boolean;
  natureRed?: String;
  valeurReduction?: Number;
  interessement?: Boolean;
  valeurInteressement?: Number;
  avantage?: Boolean;
  valeurAvantage?: Number;
  commentaireAssoc?: String;
  perioDebut?: Date;
  periodFin?: Date;
  etatOffre?: String;
  appToAllDistrs?: Boolean;
  concernDistrs?: String[];
  noConcernDistrs?: String[];
  appToAllZones?: Boolean;
  concernZones?: String[];
  noConcernZones?: String[];
  description?: String;
  commentaire?: String;
  insCaractVar?:InstCaract[];
  produitService?:ProduitSimple[];
}
