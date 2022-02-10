import { Injectable } from '@angular/core';
import {Data_Companies} from "../models/data/Data_Companies";
import {BehaviorSubject} from "rxjs";
import {ICompany} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  public dataEventsListSubject: BehaviorSubject<Array<ICompany>> = new BehaviorSubject<Array<ICompany>>(Data_Companies);
  public currentActiveCompanyIndex: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public dataCompanies = Data_Companies;

  constructor() { }
}
