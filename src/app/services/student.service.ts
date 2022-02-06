import { Injectable } from '@angular/core';
import {Data_Students} from '../models/data/Data_Students'
import {BehaviorSubject} from "rxjs";
import {Student} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentsListSubject: BehaviorSubject<Array<Student>> = new BehaviorSubject<Array<Student>>(Data_Students);
  public currentActiveStudentItemIndexSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public dataStudents: Array<Student> = Data_Students;
  public currentActiveStudentIndex: number | null = null;

  constructor() {}

  public setCurrentActiveStudentIndex(index: number): void {
    this.currentActiveStudentIndex = index;
    this.currentActiveStudentItemIndexSubject.next(index);
  }
}
