import { Injectable } from '@angular/core';
import {Data_Companies} from "../models/data/Data_Companies";
import {BehaviorSubject} from "rxjs";
import {ICompany} from "../models/interfaces";
import {StudentService} from "./student.service";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public companyListSubject: BehaviorSubject<Array<ICompany>> = new BehaviorSubject<Array<ICompany>>(Data_Companies);
  public currentActiveCompanyIndexSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public currentActiveCompanyItem: BehaviorSubject<ICompany | null> = new BehaviorSubject<ICompany | null>(null);
  public addCompanyFormDisplayedSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public deleteCompanyFormDisplayedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dataCompanies: Array<ICompany> = Data_Companies;
  public currentActiveCompanyIndex: number | null = null;

  constructor(
    private studentService: StudentService
  ) { }

  public setActiveCompany(index: number | null): void {
    this.currentActiveCompanyIndex = index;
    this.currentActiveCompanyIndexSubject.next(index);
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

  public changeDeleteFormState(isFormShouldBeOpen: boolean): void {
    this.deleteCompanyFormDisplayedSubject.next(isFormShouldBeOpen);
  }

  public addCompany(company: ICompany): void {
    let maxId = this.arrayMax(this.dataCompanies.map(company => company.id));
    company = {
      ...company,
      id: maxId + 1
    }
    this.dataCompanies.unshift(company);
    this.companyListSubject.next(this.dataCompanies);
  }

  public updateCompany(company: ICompany): void {
    const neededStudentIndex = this.dataCompanies.findIndex(_company => _company.id === company.id);
    this.dataCompanies[neededStudentIndex] = company;
    this.companyListSubject.next(this.dataCompanies);
    this.setActiveCompany(neededStudentIndex);
  }

  public deleteCompany(companyIndex: number| null = this.currentActiveCompanyIndex): void {
    const currentActiveCompany = this.dataCompanies[this.currentActiveCompanyIndex as number];
    while(this.studentService.dataEvents.findIndex(event => event.company?.id === currentActiveCompany.id) !== -1) {
      const neededIndex = this.studentService.dataEvents.findIndex(event => event.company?.id === currentActiveCompany.id)
      this.studentService.dataEvents.splice(neededIndex, 1);
      this.studentService.studentsEventsSubject.next(this.studentService.dataEvents);
    }
    if (companyIndex !== null) {
      this.dataCompanies.splice(companyIndex, 1);
    }
    this.companyListSubject.next(this.dataCompanies);
    this.changeDeleteFormState(false);
    this.currentActiveCompanyIndexSubject.next(null);
  }

  private arrayMax(arr: Array<any>) {
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }
}
