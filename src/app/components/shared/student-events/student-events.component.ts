import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Student} from "../../../models/interfaces";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.scss']
})
export class StudentEventsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public studentList: Array<Student> = [];
  public currentActiveStudent: Student | null = null;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<Student>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.currentActiveStudentItemIndexSubject.subscribe((index: number | null) => {
      this.currentActiveStudent = index === null ? null : this.studentList[index];
    }));
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
