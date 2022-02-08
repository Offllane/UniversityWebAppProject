import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {IStudent} from "../../../models/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveStudentItemIndex: number | null = null;
  public studentList: Array<IStudent> = [];
  public addStudentFormDisplayed = false;
  public isSelectStudentPossible = true;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<IStudent>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.currentActiveStudentItemIndexSubject.subscribe((index: number | null) => {
      this.currentActiveStudentItemIndex = index;
    }));
    this.dataSubscription.add(this.studentService.addStudentFormDisplayedSubject.subscribe((addStudentFormState: boolean) => {
      this.addStudentFormDisplayed = addStudentFormState;
      this.isSelectStudentPossible = !addStudentFormState;
    }));
  }

  public setStudentItemActive(index: number): void {
    if (this.isSelectStudentPossible) {
      this.studentService.setCurrentActiveStudentIndex(index);
    }
  }

  public openAddStudentForm(): void {
    this.studentService.changeAddStudentFormState(true);
  }

  public closeAddStudentForm(): void {
    this.studentService.changeAddStudentFormState(false);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
