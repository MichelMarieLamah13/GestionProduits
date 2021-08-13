import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';


@Component({
  selector: 'app-list-produits',
  templateUrl: './list-produits.component.html',
  styleUrls: ['./list-produits.component.scss']
})
export class ListProduitsComponent implements OnInit {
  public headers: Array<string>;
  public listProducts: Array<ProduitSimple>;
  public url = environment.apiEndPoint;
  public closeResult: string;
  public produitToDelete: String;
  constructor(private modalService: NgbModal, private router: Router, private productSimpleService: ProduitSimpleService, private tarifSaisonnierService: TarifSaisonnierService, private toastr: ToastrService) {
    this.headers = ['Réference', 'Image', 'Type', 'Designation', 'Pays', 'Prix', 'Actions']
    this.listProducts = [];
  }
  getProducts() {
    this.productSimpleService.getAllProducts().subscribe(
      (success) => {
        this.listProducts = success;
      },
      (error) => {
        console.log(error);
      })
  }
  ngOnInit(): void {
    this.getProducts();
  }

  onClickEdit(id: String) {
    const editUrl = ['gestion-produits/simple/edit-produit', id];
    this.router.navigate(editUrl);
  }

  onClickShow(id: String) {
    const detailUrl = ['gestion-produits/simple/details-produit', id];
    this.router.navigate(detailUrl);
  }

  setProduitToDelete(id: String) {
    this.produitToDelete = id;
  }

  onClickDelete() {
    this.productSimpleService.deleteProduitById(this.produitToDelete).subscribe(
      (success) => {
        let succeed = true;
        success.tarifSaisonnier.forEach(ts => {
          this.tarifSaisonnierService.removeTarifSaisonnierProduct(ts).subscribe(
            (success) => { },
            (error) => {
              console.log(error);
              succeed = false;
            })
          if (!succeed) {
            return;
          }
        });
        if (succeed) {
          this.toastr.success('😄', 'Le produit a été supprimé avec succès', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'

          });
        }else{
          this.toastr.error('😞', "Le produit n'a pas été supprimé avec succès", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'


          });
        }
        this.getProducts();
      },
      (error) => {
        console.log(error);
        this.toastr.error('😞', "Le produit n'a pas été supprimé avec succès", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'


        });
      }
    );
  }

  addProduit() {
    const addUrl = ['gestion-produits/simple/add-produit'];
    this.router.navigate(addUrl);
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
