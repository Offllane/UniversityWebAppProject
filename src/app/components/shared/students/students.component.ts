import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Student} from "../../../models/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveStudentItemIndex: number | null = null;
  public studentList: Array<Student> = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<Student>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.currentActiveStudentItemIndexSubject.subscribe((index: number | null) => {
      this.currentActiveStudentItemIndex = index;
    }));
  }

  public setStudentItemActive(index: number): void {
    this.studentService.setCurrentActiveStudentIndex(index);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}