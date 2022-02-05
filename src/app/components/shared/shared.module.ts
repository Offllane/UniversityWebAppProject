import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { StepTabsComponent } from "./step-tabs/step-tabs.component";
import {StepTabComponent} from "./step-tabs/step-tab/step-tab.component";



@NgModule({
  declarations: [
    HeaderComponent,
    StepTabsComponent,
    StepTabComponent
  ],
  exports: [
    HeaderComponent,
    StepTabsComponent,
    StepTabComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
