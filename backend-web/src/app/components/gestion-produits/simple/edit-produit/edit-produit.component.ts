import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { TarifSaisonnier } from 'src/app/shared/model/produit-simple/tarif-saisonnier.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.scss']
})
export class EditProduitComponent implements OnInit {
  public selectedProduct: ProduitSimple;
  public listTarifSaisonniers: Array<any>;
  public closeResult: string;
  public tsHeaders: Array<string>;
  public productForm: FormGroup;
  public maxCom: number = 1;
  public minCom: number = 1;
  public productImgs = [null, null, null, null, null];
  public url = [{
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  }
  ]

  // Dropdown pays
  disabledDropdownPays = false;
  showFilterPays = false;
  limitSelectionPays = false;
  listPays: Array<any> = [];
  selectedPays: Array<any> = [];
  dropdownPaysSettings: any = {};

  // Dropdown types
  listTypes: Array<String> = [];
  selectedType: Array<String> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;



  constructor(private modalService: NgbModal, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private produitService: ProduitSimpleService, private toastr: ToastrService, private router: Router) {
    
    this.tsHeaders = ['Label', 'Saison', 'Couleur', 'Monnaie', 'Tarif UHT', 'Actions'];

    // Dropdown pays
    this.listPays = [
      {
        item_id: 1,
        item_text: "Morocco",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/Morocco.jpg",
      },
      {
        item_id: 2,
        item_text: "United State",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg",
      },
      {
        item_id: 3,
        item_text: "France",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/France.jpg",
      },
      {
        item_id: 4,
        item_text: "United Kingdom",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg"
      }
    ];
    this.dropdownPaysSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterPays
    };

    // Dropdown couleur saisons
    this.listTypes = ['Produit', 'Service', 'Lot Mono', 'Lot Multi'];
    this.selectedType = [];
    this.dropdownTypesSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownTypesSelection
    };


  }

  ngOnInit(): void {
    //Form
    this.activatedRoute.params.subscribe(
      (success) => {
        this.produitService.findProductById(success.id).subscribe(
          (success) => {
            this.selectedProduct = success;
            this.listTarifSaisonniers = this.selectedProduct.tarifSaisonnier;
            this.selectedPays = this.listPays.filter(p => p.item_text === this.selectedProduct.pays);
            this.selectedType = this.listTypes.filter(p => p === this.selectedProduct.typePS);
            // form

            this.productForm = this.fb.group({
              refProduit: [this.selectedProduct.refProduit, [Validators.required, Validators.pattern('^[A-Za-z0-9_@ ]{4,}$')]],
              designation: [this.selectedProduct.designation, [Validators.required, Validators.pattern('^[A-Za-z0-9_@ ]{4,}$')]],
              descriptif: [this.selectedProduct.descriptif, [Validators.required, Validators.minLength(4)]],
              typePS: [this.selectedType, [Validators.required]],
              tarifUHT: [this.selectedProduct.tarifUHT, [Validators.required, Validators.pattern('[0-9]+$')]],
              minCommande: [this.selectedProduct.minCommande, [Validators.required, Validators.pattern('[0-9]+$')]],
              maxCommande: [this.selectedProduct.maxCommande, [Validators.required, Validators.pattern('[0-9]+$')]],
              pays: [this.selectedPays, [Validators.required]],
            })

            // Image
            this.getImages();

          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
        this.toastr.error('🥵', "Veuillez selectionner un produit dans la liste des produits", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    )

  }

  getImages() {
    for (var i = 0; i < this.selectedProduct.imgPD.length; i++) {
      let img = this.selectedProduct.imgPD[i];
      if (img) {
        this.url[i] = { img: environment.apiEndPoint + img };
      }
    }
  }
  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url[i].img = reader.result.toString();
    }
    this.productImgs[i] = event.target.files[0];
  }

  increment(type: string) {
    if (type === 'min') {
      this.minCom += 1;
    } else {
      this.maxCom += 1;
    }
  }

  decrement(type: string) {
    if (type === 'min') {
      this.minCom -= 1;
    } else {
      this.maxCom -= 1;
    }
  }

  // getters
  get designation() {
    return this.productForm.get('designation'); // this.productForm.value.designation
  }

  get descriptif() {
    return this.productForm.get('descriptif');
  }

  get typePS() {
    return this.productForm.get('typePS');
  }

  get tarifUHT() {
    return this.productForm.get('tarifUHT');
  }

  get minCommande() {
    return this.productForm.get('minCommande');
  }

  get maxCommande() {
    return this.productForm.get('maxCommande');
  }

  get pays() {
    return this.productForm.get('pays');
  }

  get refProduit() {
    return this.productForm.get('refProduit');
  }

  // Dropdown pays
  onPaysSelect(item: any) {
    console.log('Selected zone from event:', item);
  }

  onPaysDeSelect(item: any) {
    console.log('DeSelected zone from event:', item);
  }

  get getPays() {
    return this.listPays.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Dropdown couleur saisons
  onTypeSelect(item: any) {
    console.log('Selected type from event:', item);
  }

  onTypeDeSelect(item: any) {
    console.log('Deselected type from event:', item);
  }

  // Operations
  editProduit() {

  }

  onClickShow(id: String){

  }

  onClickEdit(id: String){

  }

  setTarifSaisonnierToDelete(id: String){

  }

  onClickDelete(){

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

  addTarifSaisonnier() {
    if (this.selectedProduct._id) {
      const addUrl = ['tarif-saisonnier/simple/add-tarif-saisonnier', this.selectedProduct._id];
      this.router.navigate(addUrl);
    } else {
      this.toastr.error('Veuillez selectionner un produit dans la liste des produits', "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.get('refProduit').setValue(this.selectedProduct.refProduit);
    this.productForm.get('designation').setValue(this.selectedProduct.designation);
    this.productForm.get('tarifUHT').setValue(this.selectedProduct.tarifUHT);
    this.productForm.get('descriptif').setValue(this.selectedProduct.descriptif);
    this.productForm.get('minCommande').setValue(this.selectedProduct.minCommande);
    this.productForm.get('maxCommande').setValue(this.selectedProduct.maxCommande);
    this.productForm.get('pays').setValue(this.selectedPays);
    this.productForm.get('typePS').setValue(this.selectedType);
    this.getImages();
  }

}
