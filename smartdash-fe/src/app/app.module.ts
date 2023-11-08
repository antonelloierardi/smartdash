import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AgendaComponent } from './components/organizer/agenda/agenda.component';
import { CalendarComponent } from './components/organizer/calendar/calendar.component';
import { AnalitycsComponent } from './components/analitycs/analitycs.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ClientComponent } from './components/clients/client/client.component';
import { SalesComponent } from './components/sales/sales.component';
import { AcquisitionsComponent } from './components/acquisitions/acquisitions.component';
import { LoginComponent } from './auth/login/login.component';
import { AlertComponent } from './components/shared/alert/alert.component';
import { FormUserComponent } from './components/shared/forms/form-user/form-user.component';
import { FormClientComponent } from './components/shared/forms/form-client/form-client.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { AdministratorComponent } from './components/administration/administrator/administrator.component';
import { UserComponent } from './components/administration/user/user.component';
import { UsersComponent } from './components/administration/users/users.component';
import { MessageModalComponent } from './components/shared/message-modal/message-modal.component';
import { TermsOfServiceComponent } from './components/menu-service/terms-of-service/terms-of-service.component';
import { PrivacyComponent } from './components/menu-service/privacy/privacy.component';
import { SupportComponent } from './components/menu-service/support/support.component';
import { HelpCenterComponent } from './components/menu-service/help-center/help-center.component';
import { FormCompanyComponent } from './components/shared/forms/form-company/form-company.component';
import { ActionsModalComponent } from './components/shared/forms/form-company/actions-modal/actions-modal.component';
import { ModalNewComponent } from './components/shared/forms/modal-new/modal-new.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ProfileComponent,
    SettingsComponent,
    ClientsComponent,
    AgendaComponent,
    CalendarComponent,
    AnalitycsComponent,
    MessagesComponent,
    NotificationsComponent,
    ClientComponent,
    SalesComponent,
    AcquisitionsComponent,
    LoginComponent,
    MessageModalComponent,
    AlertComponent,
    FormUserComponent,
    FormClientComponent,
    UsersComponent,
    AdministratorComponent,
    UserComponent,
    PaginationComponent,
    TermsOfServiceComponent,
    PrivacyComponent,
    SupportComponent,
    HelpCenterComponent,
    FormCompanyComponent,
    ActionsModalComponent,
    ModalNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FeatherModule.pick(allIcons)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
