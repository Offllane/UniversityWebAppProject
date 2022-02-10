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
  public isAddCompanyDisplayed: boolean = false;
  public isSelectPossible = true;

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.companyListSubject.subscribe((companyList: Array<ICompany>) => {
      this.companyList = companyList;
    }));
    this.dataSubscription.add(this.companyService.currentActiveCompanyIndex.subscribe((index: number | null) => {
      this.currentActiveCompanyIndex = index;
    }));
    this.dataSubscription.add(this.companyService.addCompanyFormDisplayedSubject.subscribe((addSFormState: boolean) => {
      this.isAddCompanyDisplayed = addSFormState;
      this.isSelectPossible = !addSFormState;
    }));
  }

  setCompanyItemActive(index: number): void {
    if (this.isSelectPossible) {
      this.companyService.setActiveStudent(index);
    }
  }

  public openAddForm(): void {
    this.companyService.changeAddFormState(true);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
