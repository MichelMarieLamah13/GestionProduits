import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProduitSimple } from 'src/app/shared/model/produit-simple/produit-simple.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.scss']
})
export class AddProduitComponent implements OnInit {
  public produitSimple: ProduitSimple;
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
  selectedPayss: Array<any> = [];
  dropdownPaysSettings: any = {};

  // Dropdown types
  types: Array<String> = [];
  selectedType: Array<String> = [];
  dropdownTypesSettings: any = {};
  closeDropdownTypesSelection = false;
  disabledDropdownTypes = false;
  constructor(private fb: FormBuilder, private psService: ProduitSimpleService,
    private toastr: ToastrService, private router: Router) {
    this.productForm = this.fb.group({
      refProduit: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_@ ]{4,}$')]],
      designation: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_@ ]{4,}$')]],
      descriptif: ['', [Validators.required, Validators.minLength(4)]],
      typePS: [null, [Validators.required]],
      tarifUHT: ['', [Validators.required, Validators.pattern('[0-9]+$')]],
      minCommande: [1, [Validators.required, Validators.pattern('[0-9]+$')]],
      maxCommande: [1, [Validators.required, Validators.pattern('[0-9]+$')]],
      pays: [null, [Validators.required]],
    })
    this.produitSimple = new ProduitSimple();
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
   this.types = ['Produit', 'Service', 'Lot Mono', 'Lot Multi'];
   this.selectedType = [];
   this.dropdownTypesSettings = {
     singleSelection: true,
     selectAllText: 'Select All',
     unSelectAllText: 'UnSelect All',
     allowSearchFilter: true,
     closeDropDownOnSelection: this.closeDropdownTypesSelection
   };
  }
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


  increment(type: string) {
    if (type === 'min') {
      this.minCom += 1;
      this.productForm.get('minCommande').setValue(this.minCom);
    } else {
      this.maxCom += 1;
      this.productForm.get('maxCommande').setValue(this.maxCom);
    }
  }

  decrement(type: string) {
    if (type === 'min') {
      this.minCom -= 1;
      this.productForm.get('minCommande').setValue(this.minCom);
    } else {
      this.maxCom -= 1;
      this.productForm.get('maxCommande').setValue(this.maxCom);
    }
  }
  test = ''
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
  ngOnInit(): void {
  }

  addProduit() {
    if (this.productForm.valid) {
      this.getValues();
      let fd = new FormData();
      //fd.append('imgPd',JSON.stringify(this.produitSimple.images))
      for (let i = 0; i < this.productImgs.length; i++) {
        fd.append('imgPd' + (i + 1), this.produitSimple.imgPD[i]);
      }
      fd.append('refProduit', this.produitSimple.refProduit);
      fd.append('designation', this.produitSimple.designation);
      fd.append('descriptif', this.produitSimple.descriptif);
      fd.append('tarifUHT', this.produitSimple.tarifUHT.toString());
      fd.append('pays', this.produitSimple.pays);
      fd.append('typePS', this.produitSimple.typePS);
      fd.append('minCommande', this.produitSimple.minCommande.toString());
      fd.append('maxCommande', this.produitSimple.maxCommande.toString());

      this.psService.addProduct(fd).subscribe(
        (success) => {
          this.toastr.success("L'opération a réussi", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });


          setTimeout(() => {
            const url = ["/gestion-produits/simple/list-produits"]
            this.router.navigate(url)
          }, 1500);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'opération a échoué", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      );
    } else {
      this.toastr.error("L'opération ne peut pas aboutir", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  getValues() {
    this.produitSimple = this.productForm.value;
    this.produitSimple.pays = this.pays.value.map(v=>v.item_text);
    this.produitSimple.imgPD = this.productImgs;
  }

  resetForm() {
    this.productForm.reset();
  }

  // Dropdown pays
  onPaysSelect(item: any) {
  }

  onPaysDeSelect(item: any) {
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
}
