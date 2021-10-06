import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { MaterialModule } from 'src/app/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { CityService } from 'src/app/shared/service/city.service';
import { CepService } from 'src/app/shared/service/cep.service';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from './service/cliente.service';


@NgModule({
  declarations: [
    ClienteComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    NgxMaskModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    HttpClientModule
  ],
  providers: [
    CityService,
    CepService,
    ClienteService
  ]
})
export class ClienteModule { }
