import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MasterpageComponent } from './components/masterpage/masterpage.component';
import { BodyComponent } from './components/body/body.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { UserComponent } from './users/user/user.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidenavComponent,
    MasterpageComponent,
    BodyComponent,
    UsersComponent,
    ChangePasswordComponent,
    SublevelMenuComponent,
    UserComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ReactiveFormsModule, FontAwesomeModule],
})
export class AdminModule {}
