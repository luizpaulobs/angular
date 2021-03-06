import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
      { path: 'usuario', loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'cliente', loadChildren: () => import('./modulos/cliente/cliente.module').then(m => m.ClienteModule) },
      { path: 'produtos', loadChildren: () => import('./modulos/produtos/produtos.module').then(m => m.ProdutosModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
