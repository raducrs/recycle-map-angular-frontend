import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-new-feature-dialog',
  templateUrl: './new-feature-dialog.component.html',
  styleUrls: ['./new-feature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeatureDialogComponent implements OnInit {
  elementsControl = new FormControl();
  selectedElements = [];
  elementsList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];
  topElements: any[] = [
    {
      name: 'Hartie/Carton',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'yellow'
    },
    {
      name: 'Plastic (PET)',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'blue'
    },
    {
      name: 'Sticla',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'red'
    }
  ];
  elementsListFiltered: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<NewFeatureDialogComponent>) {}

  ngOnInit() {
    this.elementsListFiltered = this.elementsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.elementsList.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onElementRemoved(element: string) {
    this.selectedElements = this.selectedElements.filter(
      val => val !== element
    );
  }
  addElement(element) {
    this.selectedElements.push(element);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onToggle(element) {
    element.isSelected = !element.isSelected;
  }
}
