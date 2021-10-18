import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TotalcardComponent } from './totalcard/totalcard.component';
import { MaterialModule } from 'src/app/material.module';
import { HomeService } from './service/home.service';


@NgModule({
  declarations: [
    HomeComponent,
    TotalcardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule { }
