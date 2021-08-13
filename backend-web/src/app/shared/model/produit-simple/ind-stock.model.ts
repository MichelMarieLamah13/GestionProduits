import { InstCaractVar } from "./inst-caract-var.model";
import { ProduitSimple } from "./produit-simple.model";

export class IndStock {
  _id: String;
  refPartenaire?: String;
  refStock?: String;
  refRFIDStock?: String;
  refQRStock?: String;
  refCodeBarreStock?: String;
  etatStock?: String;
  indQteDispo?: Boolean;
  qteDisponible?: Number;
  insCaractVar?: InstCaractVar[];
  produitService?: ProduitSimple;
}
