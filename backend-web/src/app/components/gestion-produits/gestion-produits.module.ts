import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GestionProduitsRoutingModule } from './gestion-produits-routing.module';
import { ListProduitsComponent } from './simple/list-produits/list-produits.component';
import { AddProduitComponent } from './simple/add-produit/add-produit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsProduitComponent } from './simple/details-produit/details-produit.component';
import { EditProduitComponent } from './simple/edit-produit/edit-produit.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';


@NgModule({
  declarations: [ListProduitsComponent, AddProduitComponent, DetailsProduitComponent, EditProduitComponent],
  imports: [
    CommonModule,
    GestionProduitsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    Ng2SmartTableModule,
    SharedModule,
    GalleryModule.forRoot(),
    NgbModule
  ],
  providers: [
    NgbActiveModal
  ]
})

export class GestionProduitsModule { }
