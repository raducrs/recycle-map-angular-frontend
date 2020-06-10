import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  RecyclablesDialogData,
  TypesRecycableDialogComponent
} from '../types-recycable-dialog/types-recycable-dialog.component';

@Component({
  selector: 'anms-new-feature-dialog',
  templateUrl: './new-feature-dialog.component.html',
  styleUrls: ['./new-feature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeatureDialogComponent implements OnInit {
  formGroup = new FormGroup({
    location: new FormControl(['shop'])
  });

  constructor(private dialogRef: MatDialogRef<NewFeatureDialogComponent>) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
