import { Injectable } from '@angular/core';
import {Data_Companies} from "../models/data/Data_Companies";
import {BehaviorSubject} from "rxjs";
import {ICompany, IStudent} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public companyListSubject: BehaviorSubject<Array<ICompany>> = new BehaviorSubject<Array<ICompany>>(Data_Companies);
  public currentActiveCompanyIndex: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public currentActiveCompanyItem: BehaviorSubject<ICompany | null> = new BehaviorSubject<ICompany | null>(null);
  public addCompanyFormDisplayedSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dataCompanies: Array<ICompany> = Data_Companies;

  constructor() { }

  public setActiveCompany(index: number | null): void {
    this.currentActiveCompanyIndex.next(index);
    if(index !== null) {
      this.currentActiveCompanyItem.next(this.dataCompanies[index]);
    }
  }

  public changeAddFormState(isFormShouldBeOpen: boolean, isUpdateForm = false): void {
    if(isFormShouldBeOpen && !isUpdateForm) {
      this.setActiveCompany(null);
    }
    this.addCompanyFormDisplayedSubject.next(isFormShouldBeOpen);
  }

  public addCompany(company: ICompany): void {
    this.dataCompanies.unshift(company);
    this.companyListSubject.next(this.dataCompanies);
  }

  public updateCompany(company: ICompany): void {
    const neededStudentIndex = this.dataCompanies.findIndex(_company => _company.id === company.id);
    this.dataCompanies[neededStudentIndex] = company;
    this.companyListSubject.next(this.dataCompanies);
    this.setActiveCompany(neededStudentIndex);
  }
}
