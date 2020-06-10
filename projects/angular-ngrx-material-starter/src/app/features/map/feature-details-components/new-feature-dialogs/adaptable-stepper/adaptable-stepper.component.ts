import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';

@Component({
  selector: 'anms-adaptable-stepper',
  templateUrl: './adaptable-stepper.component.html',
  styleUrls: ['./adaptable-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdaptableStepperComponent implements OnInit {
  completedWhat = false;
  completedHow = false;
  completedWho = false;

  smallScreen = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.smallScreen = window.innerWidth < 920;
  }

  // https://stackoverflow.com/a/39300671
  // https://stackoverflow.com/a/44393557 with debounce
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.smallScreen = window.innerWidth < 920;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  recycableSelectionMade(selectionMade: boolean) {
    this.completedWhat = selectionMade;
  }

  locationSelectionMade(selectionMade: boolean) {
    this.completedHow = selectionMade;
  }

  userSelectionMade(selectionMade: boolean) {
    this.completedWho = selectionMade;
  }
}
