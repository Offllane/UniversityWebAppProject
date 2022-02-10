import { Injectable } from '@angular/core';
import {Data_Students} from '../models/data/Data_Students'
import {Data_Events} from "../models/data/Data_Events";
import {BehaviorSubject} from "rxjs";
import {IStudent, IStudentEvent} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public studentsListSubject: BehaviorSubject<Array<IStudent>> = new BehaviorSubject<Array<IStudent>>(Data_Students);
  public studentsEventsSubject: BehaviorSubject<Array<IStudentEvent>> = new BehaviorSubject<Array<IStudentEvent>>(Data_Events);
  public currentActiveStudentItemIndexSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public currentActiveStudent:BehaviorSubject<IStudent | null> = new BehaviorSubject<IStudent | null>(null);
  public addStudentFormDisplayedSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public deleteStudentFormDisplayedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public dataStudents: Array<IStudent> = Data_Students;
  public currentActiveStudentIndex: number | null = null;

  constructor() {}

  public setCurrentActiveStudentIndex(index: number | null): void {
    this.currentActiveStudentIndex = index;
    this.currentActiveStudentItemIndexSubject.next(index);
    if (index !== null) {
      this.currentActiveStudent.next(this.dataStudents[index]);
    } else {
      this.currentActiveStudent.next(null);
    }
  }

  public addStudent(student: IStudent): void {
    this.dataStudents.unshift(student);
    this.studentsListSubject.next(this.dataStudents);
  }

  public updateStudent(student: IStudent): void {
    const neededStudentIndex = this.dataStudents.findIndex(_student => _student.id === student.id);
    this.dataStudents[neededStudentIndex] = student;
    this.studentsListSubject.next(this.dataStudents);
    this.setCurrentActiveStudentIndex(neededStudentIndex);
  }

  public deleteStudent(studentIndex = this.currentActiveStudentIndex) {
    if (studentIndex !== null) {
      this.dataStudents.splice(studentIndex, 1);
    }
    this.studentsListSubject.next(this.dataStudents);
    this.changeDeleteStudentFormState(false);
    this.currentActiveStudentItemIndexSubject.next(null);
  }

  public changeAddStudentFormState(isFormShouldBeOpen: boolean, isUpdateForm = false): void {
    if(isFormShouldBeOpen && !isUpdateForm) {
      this.setCurrentActiveStudentIndex(null);
    }
    this.addStudentFormDisplayedSubject.next(isFormShouldBeOpen);
  }

  public changeDeleteStudentFormState(isFormShouldBeOpen: boolean): void {
    this.deleteStudentFormDisplayedSubject.next(isFormShouldBeOpen);
  }
}
