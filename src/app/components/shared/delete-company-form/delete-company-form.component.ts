import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ICompany, IStudent} from "../../../models/interfaces";
import {CompaniesService} from "../../../services/companies.service";

@Component({
  selector: 'app-delete-company-form',
  templateUrl: './delete-company-form.component.html',
  styleUrls: ['./delete-company-form.component.scss']
})
export class DeleteCompanyFormComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public currentActiveCompany: ICompany | null = null;

  constructor(
    private companyService: CompaniesService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.companyService.currentActiveCompanyItem.subscribe((company: ICompany | null) => {
      this.currentActiveCompany = company;
    }));
  }

  deleteCompany(): void {
    this.companyService.deleteCompany();
  }

  closeDeleteForm(): void {
    this.companyService.changeDeleteFormState(false);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
