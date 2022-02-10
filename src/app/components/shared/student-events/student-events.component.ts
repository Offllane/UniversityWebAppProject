import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ICompany, IStudent, IStudentEvent} from "../../../models/interfaces";
import {StudentService} from "../../../services/student.service";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.scss']
})
export class StudentEventsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public studentList: Array<IStudent> = [];
  public companiesList: Array<ICompany> = [];
  public studentsEventsList: Array<IStudentEvent> = [];
  public currentActiveStudent: IStudent | null = null;
  public currentActiveStudentEvents: Array<IStudentEvent> = [];
  public isContinueButtonDisabled = true;
  public isAddEventFormNeeded: boolean = false;
  public isUpdateEventFormNeeded: boolean = false;
  public studentEventFormGroup: IStudentEvent = {
    date: '',
    text: '',
    company: null,
    student: this.currentActiveStudent as IStudent
  }

  constructor(
    private studentService: StudentService,
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<IStudent>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.studentsEventsSubject.subscribe((studentsEventsList: Array<IStudentEvent>) => {
      this.studentsEventsList = studentsEventsList;
      this.currentActiveStudentEvents = this.studentsEventsList.filter(event => {
        return event.student.id === this.currentActiveStudent?.id;
      });
    }));
    this.dataSubscription.add(this.studentService.currentActiveStudentItemIndexSubject.subscribe((index: number | null) => {
      if (index !== null) {
        this.currentActiveStudent = this.studentList[index];
        this.currentActiveStudentEvents = this.studentsEventsList.filter(event => {
          return event.student.id === this.currentActiveStudent?.id;
        });
      } else {
        this.currentActiveStudent = null;
        this.currentActiveStudentEvents = [];
      }
    }));
    this.dataSubscription.add(this.companyService.companyListSubject.subscribe((companiesList: Array<ICompany>) => {
      this.companiesList = companiesList;
    }));
    this.dataSubscription.add(this.studentService.addEventFormDisplayedSubject.subscribe((addEventFormState: boolean) => {
      this.isAddEventFormNeeded = addEventFormState;
    }));
    this.dataSubscription.add(this.studentService.updateEventFormDisplayedSubject.subscribe((addEventFormState: boolean) => {
      this.isUpdateEventFormNeeded = addEventFormState;
    }));
  }

  checkFieldValidation(): boolean {
    const isAllFormFieldValid = this.studentEventFormGroup.date !== '' &&
      this.studentEventFormGroup.text !== '';

    this.isContinueButtonDisabled = !isAllFormFieldValid;
    return  isAllFormFieldValid;
  }

  openEventForm(): void {
    this.studentService.changeEventFormState(true);
  }

  openUpdateEventForm(event: IStudentEvent): void{
    this.studentService.changeUpdateEventFormState(true);
    this.studentEventFormGroup = {...event};
  }

  closeUpdateEventForm(): void{
    this.studentService.changeUpdateEventFormState(false);
  }

  addEvent(event: IStudentEvent = this.studentEventFormGroup) {
    if (this.currentActiveStudent) {
      this.studentEventFormGroup.student = this.currentActiveStudent;
    }
    this.studentService.addEvent(event);
  }

  updateEvent(event: IStudentEvent = this.studentEventFormGroup) {
    event = {...event};
    this.studentService.updateEvent(event);
    this.closeUpdateEventForm();
  }

  deleteEvent(event: IStudentEvent) {
    this.studentService.deleteEvent(event);
  }

  closeAddEventForm(): void {
    this.studentService.changeEventFormState(false);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
