import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepTabsComponent } from "./step-tabs/step-tabs.component";
import {StepTabComponent} from "./step-tabs/step-tab/step-tab.component";
import { StudentsComponent } from './students/students.component';
import { StudentEventsComponent } from './student-events/student-events.component';
import { AddStudentFormComponent } from './add-student-form/add-student-form.component';
import {FormsModule} from "@angular/forms";
import { DeleteStudentFormComponent } from './delete-student-form/delete-student-form.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompaniesEventComponent } from './companies-event/companies-event.component';
import { AddCompanyFormComponent } from './add-company-form/add-company-form.component';
import { DeleteCompanyFormComponent } from './delete-company-form/delete-company-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    StepTabsComponent,
    StepTabComponent,
    StudentsComponent,
    StudentEventsComponent,
    AddStudentFormComponent,
    DeleteStudentFormComponent,
    CompaniesComponent,
    CompaniesEventComponent,
    AddCompanyFormComponent,
    DeleteCompanyFormComponent
  ],
  exports: [
    HeaderComponent,
    StepTabsComponent,
    StepTabComponent,
    StudentsComponent,
    StudentEventsComponent,
    DeleteStudentFormComponent,
    CompaniesComponent,
    CompaniesEventComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
