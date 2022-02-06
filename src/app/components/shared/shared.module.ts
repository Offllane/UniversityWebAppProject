import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepTabsComponent } from "./step-tabs/step-tabs.component";
import {StepTabComponent} from "./step-tabs/step-tab/step-tab.component";
import { StudentsComponent } from './students/students.component';
import { StudentEventsComponent } from './student-events/student-events.component';



@NgModule({
  declarations: [
    HeaderComponent,
    StepTabsComponent,
    StepTabComponent,
    StudentsComponent,
    StudentEventsComponent
  ],
    exports: [
        HeaderComponent,
        StepTabsComponent,
        StepTabComponent,
        StudentsComponent,
        StudentEventsComponent
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
