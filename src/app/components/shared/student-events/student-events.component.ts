import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Student, StudentEvent} from "../../../models/interfaces";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-student-events',
  templateUrl: './student-events.component.html',
  styleUrls: ['./student-events.component.scss']
})
export class StudentEventsComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public studentList: Array<Student> = [];
  public studentsEventsList: Array<StudentEvent> = [];
  public currentActiveStudent: Student | null = null;
  public currentActiveStudentEvents: Array<StudentEvent> = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsListSubject.subscribe((studentList: Array<Student>) => {
      this.studentList = studentList;
    }));
    this.dataSubscription.add(this.studentService.studentsEventsSubject.subscribe((studentsEventsList: Array<StudentEvent>) => {
      this.studentsEventsList = studentsEventsList;
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
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
