import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CompaniesService} from "../../../services/companies.service";
import {ICompany, IStudentEvent} from "../../../models/interfaces";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-companies-event',
  templateUrl: './companies-event.component.html',
  styleUrls: ['./companies-event.component.scss']
})
export class CompaniesEventComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveCompany: ICompany | null = null;
  public currentActiveCompanyIndex: number | null = null;
  public eventList: Array<IStudentEvent> = [];
  public currentActiveCompanyEventList: Array<any> = [];

  constructor(
    private companyService: CompaniesService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.currentActiveCompanyItem.subscribe((company: ICompany | null) => {
      this.currentActiveCompany = company;
      this.currentActiveCompanyEventList = this.eventList.filter(event => event.company?.id === this.currentActiveCompanyIndex);

    }));
    this.dataSubscription.add(this.studentService.studentsEventsSubject.subscribe((eventsList: Array<IStudentEvent>) => {
      this.eventList = eventsList;
    }));
    this.dataSubscription.add(this.companyService.currentActiveCompanyIndex.subscribe((index: number | null) => {
      this.currentActiveCompanyIndex = index;
    }));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
