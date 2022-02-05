import {Component, Input, OnInit} from '@angular/core';
import {StepTabsComponent} from "../step-tabs.component";

@Component({
  selector: 'app-step-tab',
  templateUrl: './step-tab.component.html',
  styleUrls: ['./step-tab.component.scss']
})
export class StepTabComponent implements OnInit {
  @Input() stepTitle: string = '';
  public isStepActive = false;

  constructor(steps: StepTabsComponent) {
    steps.addStep(this);
  }

  ngOnInit(): void {
  }

}
