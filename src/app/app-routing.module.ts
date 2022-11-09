import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'modal-rechazo',
    loadChildren: () => import('./paginas/modal-rechazo/modal-rechazo.module').then( m => m.ModalRechazoPageModule)
  },
  {
    path: 'modal-aceptar',
    loadChildren: () => import('./paginas/modal-aceptar/modal-aceptar.module').then( m => m.ModalAceptarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },  {
    path: 'factura',
    loadChildren: () => import('./paginas/factura/factura.module').then( m => m.FacturaPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
