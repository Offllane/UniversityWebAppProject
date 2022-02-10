import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {ICompany, IStudent} from "../../../models/interfaces";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  private dataSubscription: Subscription = new Subscription();
  public companyList: Array<ICompany> = [];
  public searchedCompanyList: Array<ICompany> = []
  public currentActiveCompanyIndex: number| null = null;
  public isAddFormDisplayed: boolean = false;
  public isSelectPossible = true;
  public isUpdateFormNeeded = false;
  public isDeleteFormNeeded = false;
  public currentActiveCompanyItem: ICompany = this.companyList[0];
  public isSearchNeeded = false;

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.companyListSubject.subscribe((companyList: Array<ICompany>) => {
      this.companyList = companyList;
      this.searchedCompanyList = companyList;
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

  setCompanyItemActive(id: number | undefined): void {
    const neededIndex =  this.companyList.findIndex(company => company.id === id);
    if (this.isSelectPossible) {
      this.companyService.setActiveCompany(neededIndex);
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

  public searchCompanies(event: any): void {
    this.companyService.setActiveCompany(null);
    this.searchedCompanyList = this.companyList.filter((company: ICompany) => company.name.toLowerCase().includes(event.target.value.toLowerCase()));
    if (event.target.value === '') {
      this.searchedCompanyList = this.companyList;
    }
  }
  public toggleSearch(): void {
    this.isSearchNeeded = !this.isSearchNeeded;
  }


  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
