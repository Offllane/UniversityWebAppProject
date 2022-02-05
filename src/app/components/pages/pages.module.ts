import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PagesRoutingModule } from './pages-routing.module';
import {StudentsPageComponent} from "./students-page/students-page.component";
import {ContactsPageComponent} from "./contacts-page/contacts-page.component";
import {EventsPageComponent} from "./events-page/events-page.component";
import {CompaniesPageComponent} from "./companies-page/companies-page.component";


@NgModule({
  declarations: [
    StudentsPageComponent,
    ContactsPageComponent,
    EventsPageComponent,
    CompaniesPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StudentsPageComponent,
    ContactsPageComponent,
    EventsPageComponent,
    CompaniesPageComponent
  ]
})
export class PagesModule { }
