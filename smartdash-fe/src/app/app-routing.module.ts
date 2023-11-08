import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnalitycsComponent } from './components/analitycs/analitycs.component';
import { ClientsComponent } from './components/clients/clients.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AgendaComponent } from './components/organizer/agenda/agenda.component';
import { CalendarComponent } from './components/organizer/calendar/calendar.component';
import { SalesComponent } from './components/sales/sales.component';
import { AcquisitionsComponent } from './components/acquisitions/acquisitions.component';
import { UserComponent } from './components/administration/user/user.component';
import { AdministratorComponent } from './components/administration/administrator/administrator.component';
import { TermsOfServiceComponent } from './components/menu-service/terms-of-service/terms-of-service.component';
import { PrivacyComponent } from './components/menu-service/privacy/privacy.component';
import { SupportComponent } from './components/menu-service/support/support.component';
import { HelpCenterComponent } from './components/menu-service/help-center/help-center.component';
import { ClientComponent } from './components/clients/client/client.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdministratorComponent, canActivate: [AuthGuard] },
  { path: 'analitycs', component: AnalitycsComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },
  { path: 'acquisitions', component: AcquisitionsComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  { path: 'terms-of-service', component: TermsOfServiceComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard] },
  { path: 'support', component: SupportComponent, canActivate: [AuthGuard] },
  { path: 'help-center', component: HelpCenterComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
