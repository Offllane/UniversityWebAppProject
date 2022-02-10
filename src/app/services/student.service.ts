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
  public addEventFormDisplayedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public updateEventFormDisplayedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public dataStudents: Array<IStudent> = Data_Students;
  public dataEvents: Array<IStudentEvent> = Data_Events;
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
    let maxId = this.arrayMax(this.dataStudents.map(student => student.id));
    student = {
      ...student,
      id: maxId + 1
    }
    this.dataStudents.unshift(student);
    this.studentsListSubject.next(this.dataStudents);
  }

  public updateStudent(student: IStudent): void {
    for (let i = 0; i < this.dataEvents.length; i++) {
      if (this.dataEvents[i].student.id === student.id) {
        this.dataEvents[i].student = student;
      }
    }
    const neededStudentIndex = this.dataStudents.findIndex(_student => _student.id === student.id);
    this.dataStudents[neededStudentIndex] = student;
    this.studentsEventsSubject.next(this.dataEvents);
    this.studentsListSubject.next(this.dataStudents);
    this.setCurrentActiveStudentIndex(neededStudentIndex);
  }

  public deleteStudent(studentIndex = this.currentActiveStudentIndex) {
    const currentActiveStudent = this.dataStudents[this.currentActiveStudentIndex as number]
    while (this.dataEvents.findIndex(event => event.student.id === currentActiveStudent.id) !== -1) {
      const neededIndex = this.dataEvents.findIndex(event => event.student.id === currentActiveStudent.id);
      this.dataEvents.splice(neededIndex, 1);
      this.studentsEventsSubject.next(this.dataEvents);
    }
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

  public changeEventFormState(isFormShouldBeOpen: boolean): void {
    this.addEventFormDisplayedSubject.next(isFormShouldBeOpen);
  }

  public changeUpdateEventFormState(isFormShouldBeOpen: boolean): void {
    this.updateEventFormDisplayedSubject.next(isFormShouldBeOpen)
  }

  public addEvent(event: IStudentEvent): void {
   let maxId = this.arrayMax(this.dataEvents.map(event => event.id));
   event = {
     ...event,
     id: maxId + 1
   }
    this.dataEvents.push(event);
    this.studentsEventsSubject.next(this.dataEvents);
    this.setCurrentActiveStudentIndex(this.currentActiveStudentIndex);
  }

  public updateEvent(event: IStudentEvent): void {
    const neededIndex = this.dataEvents.findIndex(_event => _event.id === event.id);
    this.dataEvents[neededIndex] = event;
    this.studentsEventsSubject.next(this.dataEvents);
  }

  public deleteEvent(event: IStudentEvent): void {
    let neededIndex = this.dataEvents.findIndex(_event => _event.id === event.id)
    if (neededIndex !== -1) {
      this.dataEvents.splice(neededIndex, 1);
    }
    this.studentsEventsSubject.next(this.dataEvents);
  }

  private arrayMax(arr: Array<any>) {
    return arr.reduce(function (p, v) {
      return ( p > v ? p : v );
    });
  }
}
