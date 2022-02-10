import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {IStudent} from "../../../models/interfaces";
import {Subscription} from "rxjs";
import {AddStudentFormComponent} from "../add-student-form/add-student-form.component";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveStudentItemIndex: number | null = null;
  public studentList: Array<IStudent> = [];
  public currentActiveStudentItem: IStudent = this.studentList[0];
  public isAddStudentFormDisplayed = false;
  public isDeleteStudentFormDisplayed = false;
  public isSelectStudentPossible = true;
  public isUpdateFormNeeded = false;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<IStudent>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.currentActiveStudentItemIndexSubject.subscribe((index: number | null) => {
      this.currentActiveStudentItemIndex = index;
      if (index !== null) {
        this.currentActiveStudentItem = {...this.studentList[index]};
      } else {
        this.currentActiveStudentItem = {
          name: '',
          spec: '',
          year: new Date().getFullYear(),
          group: 1
        };
      }

    }));
    this.dataSubscription.add(this.studentService.addStudentFormDisplayedSubject.subscribe((addStudentFormState: boolean) => {
      this.isAddStudentFormDisplayed = addStudentFormState;
      this.isSelectStudentPossible = !addStudentFormState;
    }));
    this.dataSubscription.add(this.studentService.deleteStudentFormDisplayedSubject.subscribe((deleteStudentFormState: boolean) => {
      this.isDeleteStudentFormDisplayed = deleteStudentFormState;
      this.isSelectStudentPossible = !deleteStudentFormState;
    }));
  }

  public setStudentItemActive(index: number): void {
    if (this.isSelectStudentPossible) {
      this.studentService.setCurrentActiveStudentIndex(index);
    }
  }

  public openAddStudentForm(): void {
    this.studentService.changeAddStudentFormState(true);
    this.isUpdateFormNeeded = false;
  }

  public openUpdateStudentForm(): void {
    this.studentService.changeAddStudentFormState(true, true);
    this.isUpdateFormNeeded = true;
  }

  public openDeleteStudentForm(): void {
    this.studentService.changeDeleteStudentFormState(true);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
