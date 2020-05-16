import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter
} from '@angular/core';
import { DetailsComponent } from '../../feature-details/interfaces/details-component';
import { DetailsParam } from '../../feature-details/interfaces/details-param';
import { DynamicComponentEventsService } from '../../feature-details/dynamic-component-events.service';
import { DynamicEvent } from '../../feature-details/interfaces/dynamic-event';
import { MatDialog } from '@angular/material/dialog';
import { NewFeatureDialogComponent } from '../dialogs/new-feature-dialog/new-feature-dialog.component';
import { TypesRecycableDialogComponent } from '../dialogs/types-recycable-dialog/types-recycable-dialog.component';

@Component({
  selector: 'anms-new-feature',
  templateUrl: './new-feature.component.html',
  styleUrls: ['./new-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeatureComponent implements OnInit, DetailsComponent {
  @Input()
  params: DetailsParam;

  constructor(
    private eventsService: DynamicComponentEventsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onAddNew() {
    const dialogRef = this.dialog.open(TypesRecycableDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  onSuppress() {
    console.log('suppress');
    this.eventsService.fireEvent({ type: 'suppress-new-feature' });
  }
}
