import { Injectable } from '@angular/core';
import {Data_Students} from '../models/data/Data_Students'
import {Data_Events} from "../models/data/Data_Events";
import {BehaviorSubject} from "rxjs";
import {Student, StudentEvent} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentsListSubject: BehaviorSubject<Array<Student>> = new BehaviorSubject<Array<Student>>(Data_Students);
  public studentsEventsSubject: BehaviorSubject<Array<StudentEvent>> = new BehaviorSubject<Array<StudentEvent>>(Data_Events);
  public currentActiveStudentItemIndexSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public dataStudents: Array<Student> = Data_Students;
  public currentActiveStudentIndex: number | null = null;

  constructor() {}

  public setCurrentActiveStudentIndex(index: number): void {
    this.currentActiveStudentIndex = index;
    this.currentActiveStudentItemIndexSubject.next(index);
  }
}
