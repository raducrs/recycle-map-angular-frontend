import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'anms-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTabComponent implements OnInit {
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();

  selection;
  userNotLoggedin = true;

  @ViewChild('userPanel', { static: true }) userPanel: MatExpansionPanel;

  constructor() {}

  ngOnInit(): void {}

  selectedOption(optionId) {
    this.selection = optionId;
    this.selectionMade.emit(true);
  }

  selectedOptionIfLoggedIn() {
    if (!this.userNotLoggedin) {
      this.selectedOption('registered');
    }
  }

  loginUser() {
    this.userNotLoggedin = false;
    this.userPanel.close();
  }
}
