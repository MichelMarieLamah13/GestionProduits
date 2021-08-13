import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { TarifSaisonnier } from 'src/app/shared/model/produit-simple/tarif-saisonnier.model';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';



@Component({
  selector: 'app-add-tarif-saisonnier',
  templateUrl: './add-tarif-saisonnier.component.html',
  styleUrls: ['./add-tarif-saisonnier.component.scss']
})
export class AddTarifSaisonnierComponent implements OnInit {

  myForm: FormGroup;
  model: NgbDateStruct;
  date: { year: number, month: number };
  tarifSaisonnier: TarifSaisonnier;

  // Dropdown saison
  saisons: Array<String> = [];
  selectedSaison: Array<String> = [];
  dropdownSaisonSettings: any = {};
  closeDropdownSaisonSelection = false;
  disabledDropdownSaison = false;

  // Dropdown couleur saison
  couleurSaisons: Array<String> = [];
  selectedCouleurSaison: Array<String> = [];
  dropdownCouleurSaisonsSettings: any = {};
  closeDropdownCouleurSaisonsSelection = false;
  disabledDropdownCouleurSaisons = false;

  // Dropdown monnaie
  disabledDropdownMonnaie = false;
  showFilterMonnaie = false;
  limitSelectionMonnaie = false;
  monnaies: Array<any> = [];
  selectedMonnaie: Array<any> = [];
  dropdownMonnaieSettings: any = {};

  // Dropdown distributeurs
  distributeurs: Array<string> = [];
  selectedDistributeurs: Array<string> = [];
  dropdownDistributeursSettings: any = {};
  closeDropdownDistributeursSelection = false;
  disabledDropdownDistributeurs = false;
  // Dropdown zones
  disabledDropdownZone = false;
  showFilterZone = false;
  limitSelectionZone = false;
  zones: Array<any> = [];
  selectedZones: Array<any> = [];
  dropdownZoneSettings: any = {};

  constructor(private router: Router, private fb: FormBuilder, private calendar: NgbCalendar, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private produitService: ProduitSimpleService, private tarifSaisonnierService: TarifSaisonnierService) {
    this.tarifSaisonnier = new TarifSaisonnier();

    // Dropdown saisons
    this.saisons = ['Eté', 'Hiver', 'Printemps', 'Automne'];
    this.selectedSaison = [];
    this.dropdownSaisonSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownSaisonSelection
    };

    // Dropdown couleur saisons
    this.couleurSaisons = ['Jaune', 'Blanc', 'Vert', 'Bleu'];
    this.selectedCouleurSaison = [];
    this.dropdownCouleurSaisonsSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownCouleurSaisonsSelection
    };

    // Dropdown monnaies
    this.monnaies = [
      {
        item_id: 1,
        item_text: "MAD",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/Morocco.jpg",
      },
      {
        item_id: 2,
        item_text: "USD",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_States.jpg",
      },
      {
        item_id: 3,
        item_text: "EUR",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/France.jpg",
      },
      {
        item_id: 4,
        item_text: "GBP",
        image: "https://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg"
      }
    ];
    this.dropdownMonnaieSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterMonnaie
    };

    // Dropdown distributeurs
    this.distributeurs = ['Apple', 'Orange', 'Samsung', 'Ali Baba'];
    this.selectedDistributeurs = [];
    this.dropdownDistributeursSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownDistributeursSelection
    };

    // Dropdown zones
    this.zones = [
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
    this.dropdownZoneSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: this.showFilterZone
    };

    // Form
    this.myForm = this.fb.group({
      labelTarif: ['', [Validators.required]],
      saison: this.fb.control({ value: this.selectedSaison, disabled: this.disabledDropdownSaison }, [Validators.required]),
      couleurSaison: this.fb.control({ value: this.selectedCouleurSaison, disabled: this.disabledDropdownCouleurSaisons }, [Validators.required]),
      monnaie: this.fb.control({ value: this.selectedMonnaie, disabled: this.disabledDropdownMonnaie }, [Validators.required]),
      appToAllZones: ['', [Validators.required]],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      concernZones: this.fb.control({ value: this.selectedZones, disabled: this.disabledDropdownZone }, [Validators.required]),
      tarifUHT: ['', [Validators.required]],
      appToAllDistrs: ['', [Validators.required]],
      concernDistrs: this.fb.control({ value: this.selectedDistributeurs, disabled: this.disabledDropdownDistributeurs }, [Validators.required]),
    });

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((success) => {
      this.produitService.findProductById(success.id).subscribe(
        (success) => {
          this.tarifSaisonnier.produitService = success;
        },
        (error) => {
          console.log(error);
        })
    },
      (error) => {
        console.log(error);
      })
  }

  // Dropdown saisons
  onSaisonSelect(item: any) {
  }

  onSaisonDeSelect(item: any) {
  }

  // Dropdown couleur saisons
  onCouleurSaisonSelect(item: any) {
  }

  onCouleurSaisonDeSelect(item: any) {
  }

  // Dropdown monnaies
  onMonnaieSelect(item: any) {
  }

  onMonnaieDeSelect(item: any) {
  }

  get getMonnaies() {
    return this.monnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Dropdown distributeurs
  onDistributeurSelect(item: any) {
  }

  onDistributeurDeSelect(item: any) {
  }

  onSelectAllDistributeurs(items: any) {
  }

  onDeSelectAllDistributeurs(items: any) {
  }

  // Dropdown zones
  onZoneSelect(item: any) {
  }

  onZoneDeSelect(item: any) {
  }

  onSelectAllZones(items: any) {
  }

  onDeSelectAllZones(items: any) {
  }

  get getZones() {
    return this.zones.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Operations
  addTarifSaisonnier() {
    if (this.myForm.valid) {
      this.getValues();
      this.tarifSaisonnierService.addTarifSaisonnier(this.tarifSaisonnier).subscribe(
        (success) => {
          this.toastr.success("👌", "Le Tarif saisonnier été ajouté avec succès", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.produitService.addTarifSaisonnierToList(this.tarifSaisonnier.produitService._id, success._id).subscribe(
            (success) => {
              setTimeout(() => {
                const editUrl = ['gestion-produits/simple/edit-produit', this.tarifSaisonnier.produitService._id];
                this.router.navigate(editUrl);
              }, 2000);

            },
            (error) => {
              console.log({ error: error });
              this.toastr.error("Le Tarif saisonnier n'a pas été ajouté", "🥵", {
                timeOut: 2000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right'
              });
            }
          );
        },
        (error) => {
          console.log(error);
          this.toastr.error("Le Tarif saisonnier été ajouté avec succès", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        })

    } else {
      this.toastr.error('🥵', "Veuillez bien remplir les champs du formulaire", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  clearValues() {
    this.myForm.reset();
    this.tarifSaisonnier = new TarifSaisonnier();
    this.toastr.success("👌", "Le formulaire a été réinitialisé avec succès", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
  }

  getValues() {
    this.tarifSaisonnier.couleurSaison = this.couleurSaison.value[0];
    this.tarifSaisonnier.saison = this.saison.value[0];
    this.tarifSaisonnier.monnaie = this.monnaie.value[0].item_text;
    this.tarifSaisonnier.labelTarif = this.labelTarif.value;
    this.tarifSaisonnier.tarifUHT = this.tarifUHT.value;
    this.tarifSaisonnier.dateDebut = new Date(this.dateDebut.value.year, this.dateDebut.value.month - 1, this.dateDebut.value.day);
    this.tarifSaisonnier.dateFin = new Date(this.dateFin.value.year, this.dateFin.value.month - 1, this.dateFin.value.day);
    this.tarifSaisonnier.appToAllDistrs = this.appToAllDistrs.value === "Oui";
    this.tarifSaisonnier.concernDistrs = this.concernDistrs.value.map(x => x)
    this.tarifSaisonnier.noConcernDistrs = this.distributeurs.filter(x => !this.tarifSaisonnier.concernDistrs.includes(x));
    this.tarifSaisonnier.appToAllZones = this.appToAllZones.value === "Oui";
    this.tarifSaisonnier.concernZones = this.concernZones.value.map(x => x.item_text)
    let tmp = this.zones.filter(x => !this.tarifSaisonnier.concernZones.includes(x.item_text));
    this.tarifSaisonnier.noConcernZones = tmp.map(x => x.item_text);
  }
  // Getters
  get dateDebut() {
    return this.myForm.get('dateDebut');
  }

  get dateFin() {
    return this.myForm.get('dateFin');
  }

  get labelTarif() {
    return this.myForm.get('labelTarif');
  }

  get saison() {
    return this.myForm.get('saison');
  }

  get tarifUHT() {
    return this.myForm.get('tarifUHT');
  }

  get monnaie() {
    return this.myForm.get('monnaie');
  }

  get couleurSaison() {
    return this.myForm.get('couleurSaison');
  }

  get appToAllDistrs() {
    return this.myForm.get('appToAllDistrs');
  }

  get concernDistrs() {
    return this.myForm.get('concernDistrs');
  }

  get appToAllZones() {
    return this.myForm.get('appToAllZones');
  }

  get concernZones() {
    return this.myForm.get('concernZones');
  }
}
