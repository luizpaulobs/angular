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
import { CityService } from 'src/app/shared/service/city.service';
import { HttpClientModule } from '@angular/common/http';
import { CepService } from 'src/app/shared/service/cep.service';
import { ModalModule } from 'src/app/shared/components/removermodal/modal.module';


@NgModule({
  declarations: [
    UsuarioComponent,
    FormComponent,
    DetalhesComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    NgxMaskModule,
    FormsModule,
    ModalModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CityService,
    CepService
  ]
})
export class UsuarioModule { }
