import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { DetailsComponent } from '../../feature-details/interfaces/details-component';
import { DetailsParam } from '../../feature-details/interfaces/details-param';
import { DynamicComponentEventsService } from '../../feature-details/dynamic-component-events.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFeatureDialogComponent } from '../new-feature-dialogs/new-feature-dialog/new-feature-dialog.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

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
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onAddNew() {
    if (window.innerWidth < 720) {
      // https://stackoverflow.com/questions/35279291/angular2-how-to-find-out-what-was-previous-page-url-when-using-angular2-routing
      const pathSplits = this.location.path().split('?');
      const state = {};
      if (pathSplits.length > 1) {
        const querySplits = pathSplits[1].split('&');
        querySplits.forEach(q => {
          const keyValueSplits = q.split('=');
          if (keyValueSplits.length > 1) {
            const key = keyValueSplits[0];
            state[key] = keyValueSplits[1];
          }
        });
      }

      // https://stackoverflow.com/a/54365098
      this.router.navigate(['map', 'feature', 'new'], { state });
    } else {
      const dialogRef = this.dialog.open(NewFeatureDialogComponent, {});

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }
  }

  onSuppress() {
    this.eventsService.fireEvent({ type: 'suppress-new-feature' });
  }
}
