import { Expedition } from "./expedition.model";
import { IndFraisAdd } from "./ind-frais-add.model";
import { IndPromo } from "./ind-promo.model";
import { IndStock } from "./ind-stock.model";
import { ProduitSimple } from "./produit-simple.model";

export class InstCaractVar {
  _id?: String;
  refInstCaractVar?: String;
  affUniqPriv?: Boolean;
  groupe?: String;
  label?: String;
  valeur?: String;
  unite?: String;
  ordre?: Number;
  typeCoutAdd?: Number;
  valeurCoutAdd?: Number;
  prix?: Number;
  produitService?: ProduitSimple[];
  indPromo?: IndPromo[];
  indFraisAdd?: IndFraisAdd[];
  indStock?: IndStock[];
  expedition?: Expedition[];
}
