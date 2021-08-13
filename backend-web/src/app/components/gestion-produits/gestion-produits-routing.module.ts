import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProduitComponent } from './simple/add-produit/add-produit.component';
import { DetailsProduitComponent } from './simple/details-produit/details-produit.component';
import { EditProduitComponent } from './simple/edit-produit/edit-produit.component';
import { ListProduitsComponent } from './simple/list-produits/list-produits.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'simple/list-produits',
        component: ListProduitsComponent,
        data: {
          title: 'Produits Lists',
          breadcrumb: "Produits Lists"
        }
      },
      {
        path: 'simple/add-produit',
        component: AddProduitComponent,
        data: {
          title: 'Add Produit',
          breadcrumb: "Add Produit"
        }
      },
      {
        path: 'simple/edit-produit/:id',
        component: EditProduitComponent,
        data: {
          title: 'Edit Produit',
          breadcrumb: "Edit Produit"
        }
      },
      {
        path: 'simple/details-produit/:id',
        component: DetailsProduitComponent,
        data: {
          title: 'Details Produit',
          breadcrumb: "Details Produit"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProduitsRoutingModule { }
