import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from '../../model/produit-simple/produit-simple.model';
@Injectable({
  providedIn: 'root'
})
export class ProduitSimpleService {

  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<ProduitSimple[]>{
    return this.httpClient.get<ProduitSimple[]>(environment.apiEndPoint+'produitServices');
  }

  addProduct(product: any): Observable<any>{
    return this.httpClient.post<any>(environment.apiEndPoint+'produitServices', product);
  }

  findProductById(id: String):Observable<ProduitSimple>{
    return this.httpClient.get<ProduitSimple>(environment.apiEndPoint+`produitServices/${id}`);
  }

  deleteProduitById(id: String):Observable<ProduitSimple>{
    return this.httpClient.delete<ProduitSimple>(environment.apiEndPoint+`produitServices/${id}`);
  }

  addTarifSaisonnierToList(idProduit: any, idTs: any){
    return this.httpClient.patch(environment.apiEndPoint+`produitServices/${idProduit}/addTarifSaisonnier`,{tsId:idTs});
  }

  deleteTarifSaisonnierFromList(idProduit: any, idTs: any){
    return this.httpClient.patch(environment.apiEndPoint+`produitServices/${idProduit}/deleteTarifSaisonnier`,{tsId:idTs});
  }
}
