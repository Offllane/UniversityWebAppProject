import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IStudentEvent} from "../../../models/interfaces";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public studentsEventsList: Array<IStudentEvent> = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.studentsEventsSubject.subscribe((studentsEventsList: Array<IStudentEvent>) => {
      this.studentsEventsList = studentsEventsList;
    }));
  }


  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
