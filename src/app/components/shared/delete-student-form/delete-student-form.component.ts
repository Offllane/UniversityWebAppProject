import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {StudentService} from "../../../services/student.service";
import {IStudent} from "../../../models/interfaces";


@Component({
  selector: 'app-delete-student-form',
  templateUrl: './delete-student-form.component.html',
  styleUrls: ['./delete-student-form.component.scss']
})
export class DeleteStudentFormComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveStudent: IStudent | null = null;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.studentService.currentActiveStudent.subscribe((student: IStudent | null) => {
      this.currentActiveStudent = student;
    }));
  }

  deleteStudent(): void {
    this.studentService.deleteStudent();
  }

  closeDeleteStudentForm(): void {
    this.studentService.changeDeleteStudentFormState(false);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
