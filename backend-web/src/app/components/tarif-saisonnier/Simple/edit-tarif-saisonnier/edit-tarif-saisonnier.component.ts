import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TarifSaisonnier } from 'src/app/shared/model/produit-simple/tarif-saisonnier.model';
import { TarifSaisonnierService } from 'src/app/shared/service/produit-simple/tarif-saisonnier.service';

@Component({
  selector: 'app-edit-tarif-saisonnier',
  templateUrl: './edit-tarif-saisonnier.component.html',
  styleUrls: ['./edit-tarif-saisonnier.component.scss']
})
export class EditTarifSaisonnierComponent implements OnInit {
  public selectedTs = {
    _id: '',
    labelTarif: '',
    saison: [],
    couleurSaison: [],
    monnaie: [],
    tarifUHT: '',
    dateDebut: { year: 0, month: 0, day: 0 },
    dateFin: { year: 0, month: 0, day: 0 },
    appToAllDistrs: '',
    concernDistrs: [],
    appToAllZones: '',
    concernZones: [],
    produitService: ''
  };

  public tsToEdit: TarifSaisonnier;

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
  constructor(private router: Router, private tarifSaisonnierService: TarifSaisonnierService, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.tsToEdit = new TarifSaisonnier();
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
  }

  ngOnInit(): void {
    this.resetAllValues();

  }

  resetAllValues() {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.tarifSaisonnierService.findTarifSaisonnierById(success.id).subscribe(
          (success) => {
            this.selectedTs._id = success._id;
            this.selectedTs.labelTarif = success.labelTarif;
            this.selectedTs.tarifUHT = success.tarifUHT.toString();
            this.selectedTs.saison = [success.saison];
            this.selectedTs.couleurSaison = [success.couleurSaison];
            this.selectedTs.monnaie = this.monnaies.filter(item => item.item_text == success.monnaie);
            this.selectedTs.appToAllDistrs = success.appToAllDistrs ? "Oui" : "Non";
            this.selectedTs.appToAllZones = success.appToAllZones ? "Oui" : "Non";
            this.selectedTs.concernDistrs = this.distributeurs.filter(item => success.concernDistrs.includes(item));
            this.selectedTs.concernZones = this.zones.filter(item => success.concernZones.includes(item.item_text));
            this.selectedTs.produitService = success.produitService;
            let dateDebut = new Date(success.dateDebut)
            this.selectedTs.dateDebut = {
              year: dateDebut.getFullYear(),
              month: dateDebut.getMonth() + 1,
              day: dateDebut.getDate()
            }

            let dateFin = new Date(success.dateFin)
            this.selectedTs.dateFin = {
              year: dateFin.getFullYear(),
              month: dateFin.getMonth() + 1,
              day: dateFin.getDate()
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // Monnaies dropdown
  get getMonnaies() {
    return this.monnaies.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Zones dropdown
  get getZones() {
    return this.zones.reduce((acc, curr) => {
      acc[curr.item_id] = curr;
      return acc;
    }, {});
  }

  // Operations
  onclickEdit(myForm: NgForm) {
    if (myForm.valid) {
      this.getValues();
      this.tarifSaisonnierService.editTarifSaisonnier(this.tsToEdit).subscribe(
        (success) => {
          this.toastr.success("Le Tarif saisonnier été modifier avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const editUrl = ['tarif-saisonnier/simple/list-tarif-saisonnier'];
            this.router.navigate(editUrl);
          }, 2000);
        }, 
        (error) => {
          console.log(error);
        });
      
    } else {
      this.toastr.error("Merci de bien vouloir remplir les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  onclickDiscard() {
    this.resetAllValues();

  }

  getValues() {
    this.tsToEdit._id = this.selectedTs._id;
    this.tsToEdit.labelTarif = this.selectedTs.labelTarif;
    this.tsToEdit.tarifUHT = Number.parseFloat(this.selectedTs.tarifUHT);
    this.tsToEdit.monnaie = this.selectedTs.monnaie[0].item_text;
    this.tsToEdit.saison = this.selectedTs.saison[0];
    this.tsToEdit.couleurSaison = this.selectedTs.couleurSaison[0];
    this.tsToEdit.appToAllDistrs = this.selectedTs.appToAllDistrs == "Oui";
    this.tsToEdit.concernDistrs = this.selectedTs.concernDistrs;
    this.tsToEdit.appToAllZones = this.selectedTs.appToAllZones == "Oui";
    this.tsToEdit.concernZones = this.selectedTs.concernZones.map(x => x.item_text);
    this.tsToEdit.produitService = this.selectedTs.produitService;
    this.tsToEdit.dateDebut = new Date(this.selectedTs.dateDebut.year, this.selectedTs.dateDebut.month - 1, this.selectedTs.dateDebut.day);
    this.tsToEdit.dateFin = new Date(this.selectedTs.dateFin.year, this.selectedTs.dateFin.month - 1, this.selectedTs.dateFin.day);

  }
}
