import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MasterpageComponent } from './components/masterpage/masterpage.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidenavComponent,
    MasterpageComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
