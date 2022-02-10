import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CompaniesService} from "../../../services/companies.service";
import {ICompany} from "../../../models/interfaces";

@Component({
  selector: 'app-companies-page',
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss']
})
export class CompaniesPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
