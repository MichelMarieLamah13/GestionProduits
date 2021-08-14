import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
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
  public selectedPd = {
    refProduit: '',
    designation: '',
    descriptif: '',
    typePS: [],
    tarifUHT: 0,
    minCommande: 0,
    maxCommande: 0,
    pays: []
  }
  public listTarifSaisonniers: Array<any>;
  public closeResult: string;
  public tsHeaders: Array<string>;
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
  listPays: Array<DdPays>;
  selectedPays: Array<DdPays>;
  dropdownPaysSettings: any = {};

  // Dropdown types
  listTypes: Array<string> = [];
  selectedType: Array<string> = [];
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
            this.resetAllValues();
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

  resetAllValues() {
    this.listTarifSaisonniers = this.selectedProduct.tarifSaisonnier;
    this.selectedPays = this.listPays.filter(p => p.item_text === this.selectedProduct.pays);
    this.selectedType = this.listTypes.filter(p => p === this.selectedProduct.typePS);
    this.selectedPd.refProduit = this.selectedProduct.refProduit;
    this.selectedPd.designation = this.selectedProduct.designation;
    this.selectedPd.descriptif = this.selectedProduct.descriptif;
    this.selectedPd.typePS = this.selectedType;
    this.selectedPd.pays = this.selectedPays;
    this.selectedPd.tarifUHT = this.selectedProduct.tarifUHT;
    this.selectedPd.maxCommande = this.selectedProduct.maxCommande;
    this.selectedPd.minCommande = this.selectedProduct.minCommande;
    this.getImages();
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
      this.selectedPd.minCommande +=1; 
    } else {
      this.selectedPd.maxCommande +=1; 
    }
  }

  decrement(type: string) {
    if (type === 'min') {
      this.selectedPd.minCommande -=1; 
    } else {
      this.selectedPd.maxCommande -=1; 
    }
  }



  // Dropdown pays
  onPaysSelect(item: any) {
  }

  onPaysDeSelect(item: any) {
    console.log(this.selectedPd.pays);
  }

  get getPays() {
    return this.listPays.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Dropdown couleur saisons
  onTypeSelect(item: any) {
  }

  onTypeDeSelect(item: any) {
  }

  // Operations
  editProduit(productForm: NgForm) {
    if (productForm.valid) {
      this.toastr.success("L'opération a réussi", "👌", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    } else {
      this.toastr.error("Merci de bien remplir le formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  onClickShow(id: String) {

  }

  onClickEdit(id: String) {

  }

  setTarifSaisonnierToDelete(id: String) {

  }

  onClickDelete() {

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

  resetForm(productForm: NgForm) {
    this.resetAllValues();
  }

}

export interface DdPays {
  item_id: number,
  item_text: string,
  image: string
};

