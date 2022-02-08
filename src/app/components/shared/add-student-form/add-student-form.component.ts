import { Component, OnInit } from '@angular/core';
import {IStudent} from "../../../models/interfaces";
import {Data_Speciality} from "../../../models/data/Data_Speciality";
import {StudentService} from "../../../services/student.service";

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss']
})
export class AddStudentFormComponent implements OnInit {
  public addStudentFormGroup: IStudent = {
    name: '',
    spec: '',
    year: new Date().getFullYear(),
    group: 1
  }
  public specsArray = Data_Speciality;
  public isContinueButtonDisabled = true;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {}

  updateValue(propertyName: keyof IStudent, target: any): void {
    // @ts-ignore
    this.addStudentFormGroup[propertyName] = target.value;
    console.log(this.addStudentFormGroup);
  }

  addStudent(): void {
    this.studentService.addStudent(this.addStudentFormGroup);
    this.closeAddStudentForm();
    this.studentService.setCurrentActiveStudentIndex(0);
  }

  checkFieldValidation(): boolean {
    const isAllFormFieldValid = this.addStudentFormGroup.name !== '' &&
      this.addStudentFormGroup.spec !== '' &&
      this.addStudentFormGroup.year >= new Date().getFullYear() - 10 &&
      this.addStudentFormGroup.year <= new Date().getFullYear() &&
      this.addStudentFormGroup.group >= 1 && this.addStudentFormGroup.group <= 20;

    this.isContinueButtonDisabled = !isAllFormFieldValid;
    return  isAllFormFieldValid;
  }

  public closeAddStudentForm(): void {
    this.studentService.changeAddStudentFormState(false);
  }
}
