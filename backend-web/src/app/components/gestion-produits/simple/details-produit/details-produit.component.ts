import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { ModalDismissReasons, NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.scss']
})
export class DetailsProduitComponent implements OnInit {

  public selectedProduct: ProduitSimple;
  public closeResult: string;
  public counter: number = 1;

  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(1, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(3, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' })]

  constructor(private modalService: NgbModal, config: NgbRatingConfig, private activatedRoute: ActivatedRoute, private produitService: ProduitSimpleService) {
    this.selectedProduct = new ProduitSimple();
    config.max = 5;
    config.readonly = false;
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
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

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (success)=>{
        this.produitService.findProductById(success.id).subscribe(
          (success)=>{
            this.selectedProduct = success;
            this.counter = Number.parseInt(this.selectedProduct.minCommande.toString());
            console.log(this.selectedProduct);
            for (var i =0; i<this.selectedProduct.imgPD.length; i++){
              let img = this.selectedProduct.imgPD[i];
              if (img){
                this.imagesRect[i]=new Image(i, {img:environment.apiEndPoint+img}, {img:environment.apiEndPoint+img});
              }
            }
          },
          (error)=>{
            console.log(error);
          }
        );
      },
      (error)=>{
        console.log(error);

      }
    )
  }

}
