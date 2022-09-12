import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageModule } from '../paginas/login/login.module';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,

    TabsPageRoutingModule,
    LoginPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
