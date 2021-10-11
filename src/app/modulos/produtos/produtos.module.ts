import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule } from 'src/app/shared/components/removermodal/modal.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material.module';
import { ProductService } from './service/product.service';
import { DetalhesComponent } from './detalhes/detalhes.component';


@NgModule({
  declarations: [
    ProdutosComponent,
    FormComponent,
    DetalhesComponent
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    NgxMaskModule,
    FormsModule,
    ModalModule,
    HttpClientModule
  ],
  providers: [
    ProductService
  ]
})
export class ProdutosModule { }
