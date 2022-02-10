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
  public isAddFormDisplayed: boolean = false;
  public isSelectPossible = true;
  public isUpdateFormNeeded = false;
  public isDeleteFormNeeded = false;
  public currentActiveCompanyItem: ICompany = this.companyList[0];

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.companyListSubject.subscribe((companyList: Array<ICompany>) => {
      this.companyList = companyList;
    }));
    this.dataSubscription.add(this.companyService.currentActiveCompanyIndexSubject.subscribe((index: number | null) => {
      this.currentActiveCompanyIndex = index;
    }));
    this.dataSubscription.add(this.companyService.currentActiveCompanyIndexSubject.subscribe((index: number | null) => {
      this.currentActiveCompanyIndex = index;
      if(index !== null) {
        this.currentActiveCompanyItem = {... this.companyList[index]};
      } else {
        this.currentActiveCompanyItem = {
          name: '',
        };
      }
    }));
    this.dataSubscription.add(this.companyService.addCompanyFormDisplayedSubject.subscribe((addSFormState: boolean) => {
      this.isAddFormDisplayed = addSFormState;
      this.isSelectPossible = !addSFormState;
    }));
    this.dataSubscription.add(this.companyService.deleteCompanyFormDisplayedSubject.subscribe((deleteFormState: boolean) => {
      this.isDeleteFormNeeded = deleteFormState;
      this.isSelectPossible = !deleteFormState;
    }));
  }

  setCompanyItemActive(index: number): void {
    if (this.isSelectPossible) {
      this.companyService.setActiveCompany(index);
    }
  }

  public openAddForm(): void {
    this.companyService.changeAddFormState(true);
    this.isUpdateFormNeeded = false;
  }

  public openUpdateForm(): void {
    this.companyService.changeAddFormState(true, true);
    this.isUpdateFormNeeded = true;
  }

  public openDeleteForm(): void {
    this.companyService.changeDeleteFormState(true);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
