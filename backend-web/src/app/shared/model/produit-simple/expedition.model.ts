import { InstCaractVar } from "./inst-caract-var.model";
import { ProduitSimple } from "./produit-simple.model";

export class Expedition {
  _id?: String;
  poids?: Number;
  codeUnitePoids?: String;
  largeur?: Number;
  hauteur?: Number;
  profondeur?: Number;
  refQRStock?: String;
  refCodeBarreStock?: String;
  etatStock?: String;
  indQteDispo?: Boolean;
  uniteDimension?: String;
  classeLivraison?: String;
  insCaractVar?: InstCaractVar[];
  produitService?: ProduitSimple;
}
