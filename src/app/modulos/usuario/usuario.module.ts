import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { FormComponent } from './form/form.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgxMaskModule } from 'ngx-mask';
import { RemovermodalComponent } from './removermodal/removermodal.component';


@NgModule({
  declarations: [
    UsuarioComponent,
    FormComponent,
    DetalhesComponent,
    RemovermodalComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    NgxMaskModule,
    FormsModule
  ],
  providers: [
    UserService
  ]
})
export class UsuarioModule { }
