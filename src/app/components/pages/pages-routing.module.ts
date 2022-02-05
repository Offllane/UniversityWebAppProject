import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsPageComponent} from "./students-page/students-page.component";
import {ContactsPageComponent} from "./contacts-page/contacts-page.component";
import {EventsPageComponent} from "./events-page/events-page.component";
import {CompaniesPageComponent} from "./companies-page/companies-page.component";

const routes: Routes = [
  { path: 'students', component: StudentsPageComponent },
  { path: 'contacts', component: ContactsPageComponent },
  { path: 'events', component: EventsPageComponent },
  { path: 'companies', component: CompaniesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
