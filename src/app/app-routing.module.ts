import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StudentsPageComponent} from "./components/pages/students-page/students-page.component";

const routes: Routes = [
  { path: 'app', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
  { path: '**', component: StudentsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
