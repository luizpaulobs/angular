import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ClienteComponent },
  { path: 'incluir', component: FormComponent},
  { path: 'editar/:id', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
