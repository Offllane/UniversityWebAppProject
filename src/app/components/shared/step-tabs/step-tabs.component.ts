import {Component, OnInit} from '@angular/core';
import {StepTabComponent} from "./step-tab/step-tab.component";

@Component({
  selector: 'app-step-tabs',
  templateUrl: './step-tabs.component.html',
  styleUrls: ['./step-tabs.component.scss']
})
export class StepTabsComponent implements OnInit {
  steps: StepTabComponent[] = new Array<StepTabComponent>();

  constructor() { }

  ngOnInit(): void {
  }

  addStep(step: StepTabComponent) {
    if (this.steps.length === 0) {
      step.isStepActive = true; // make first step active by default
    }
    this.steps.push(step);
  }

  selectStep(neededStepIndex: number) {
    this.steps.forEach((step: StepTabComponent) => {
      step.isStepActive = false;
    });
    this.steps[neededStepIndex].isStepActive = true;
  }
}
