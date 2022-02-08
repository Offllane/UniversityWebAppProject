import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IStudent} from "../../../models/interfaces";
import {Data_Speciality} from "../../../models/data/Data_Speciality";
import {StudentService} from "../../../services/student.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.scss']
})
export class AddStudentFormComponent implements OnInit, OnDestroy {
  @Input() isUpdateForm = false;
  private dataSubscription: Subscription = new Subscription();
  @Input() addStudentFormGroup: IStudent = {
    name: '',
    spec: '',
    year: new Date().getFullYear(),
    group: 1
  };
  public specsArray = Data_Speciality;
  public isContinueButtonDisabled = true;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {}

  updateFormValue(propertyName: keyof IStudent, target: any): void {
    // @ts-ignore
    this.addStudentFormGroup[propertyName] = target.value;
  }

  addStudent(): void {
    this.studentService.addStudent(this.addStudentFormGroup);
    this.closeAddStudentForm();
    this.studentService.setCurrentActiveStudentIndex(0);
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.addStudentFormGroup);
    this.closeAddStudentForm();
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

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
