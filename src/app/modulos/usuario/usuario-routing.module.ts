import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { FormComponent } from './form/form.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  { path: '', component: UsuarioComponent },
  { path: 'incluir', component: FormComponent },
  { path: 'editar/:id', component: FormComponent },
  { path: 'detalhes', component: DetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
