import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ICompany, IStudent} from "../../../models/interfaces";
import {Data_Speciality} from "../../../models/data/Data_Speciality";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.scss']
})
export class AddCompanyFormComponent implements OnInit, OnDestroy {
  @Input() isUpdateForm = false;
  private dataSubscription: Subscription = new Subscription();
  @Input() addFormGroup: ICompany = {
    name: '',
  };
  public specsArray = Data_Speciality;
  public isContinueButtonDisabled = true;

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
  }

  updateFormValue(propertyName: keyof IStudent, target: any): void {
    // @ts-ignore
    this.addFormGroup[propertyName] = target.value;
  }

  checkFieldValidation(): boolean {
    const isAllFormFieldValid = this.addFormGroup.name !== '';

    this.isContinueButtonDisabled = !isAllFormFieldValid;
    return  isAllFormFieldValid;
  }

  addCompany(): void {
    this.companyService.addCompany(this.addFormGroup);
    this.closeAddForm();
    this.companyService.setActiveCompany(0);
  }

  updateCompany(): void {
    this.companyService.updateCompany(this.addFormGroup);
    this.closeAddForm();
  }

  closeAddForm(): void {
    this.companyService.changeAddFormState(false);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
