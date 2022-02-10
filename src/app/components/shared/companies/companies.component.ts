import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ICompany} from "../../../models/interfaces";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  private dataSubscription: Subscription = new Subscription();
  public companyList: Array<ICompany> = [];
  public currentActiveCompanyIndex: number| null = null;

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.dataEventsListSubject.subscribe((companyList: Array<ICompany>) => {
      this.companyList = companyList;
    }));
    this.dataSubscription.add(this.companyService.currentActiveCompanyIndex.subscribe((index: number | null) => {
      this.currentActiveCompanyIndex = index;
    }));
  }

  setCompanyItemActive(index: number): void {
    this.companyService.setActiveStudent(index);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
