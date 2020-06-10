import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  RecyclablesDialogData,
  TypesRecycableDialogComponent
} from '../types-recycable-dialog/types-recycable-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'anms-recycable-tab',
  templateUrl: './recycable-tab.component.html',
  styleUrls: ['./recycable-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecycableTabComponent implements OnInit {
  @Output() selectionMade: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedElements = [];
  custom = '';
  customCategoryId = -1;
  elementPool = [];
  topElements: any[] = [
    {
      name: 'Hartie/Carton',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'yellow',
      icon: 'recycle',
      categoryId: 0
    },
    {
      name: 'Plastic (PET)',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'blue',
      icon: 'recycle',
      categoryId: 1
    },
    {
      name: 'Sticla',
      isSelected: false,
      styleClass: 'pregenerated',
      color: 'red',
      icon: 'recycle',
      categoryId: 2
    }
  ];
  categories = [
    {
      name: 'Hartie/Carton',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'yellow',
      icon: 'recycle'
    },
    {
      name: 'Plastic (PET)',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 1,
      color: 'blue',
      icon: 'recycle'
    },
    {
      name: 'Sticla',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 2,
      color: 'red',
      icon: 'recycle'
    },
    {
      name: 'Baterii/pile',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 3,
      color: 'purple',
      icon: 'recycle'
    },
    {
      name: 'Becuri/neoane',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 4,
      color: 'purple',
      icon: 'recycle'
    },
    {
      name: 'Plastic (PP)',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 5,
      color: 'grey',
      icon: 'recycle'
    },
    {
      name: 'Plastic dur',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 6,
      color: 'grey',
      icon: 'recycle'
    },
    {
      name: 'Reciclare textile',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 7,
      color: 'grey',
      icon: 'recycle'
    },
    {
      name: 'Donatie haine',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 8,
      color: 'grey',
      icon: 'hand-holding-heart'
    },
    {
      name: 'Donatie carti',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 9,
      color: 'grey',
      icon: 'hand-holding-heart'
    }
  ];
  elementsListFiltered: Observable<string[]>;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.elementPool = this.topElements;
  }

  onSearchMore() {
    const dialogRef = this.dialog.open(TypesRecycableDialogComponent, {
      data: {
        selectedCategories: this.elementPool
          .filter(elem => elem.categoryId !== this.customCategoryId)
          .filter(elem => elem.isSelected)
          .map(elem => elem.categoryId),
        selectedCustom: this.elementPool.some(
          elem => elem.categoryId === this.customCategoryId && elem.isSelected
        )
          ? this.custom
          : ''
      }
    });

    dialogRef.afterClosed().subscribe((result: RecyclablesDialogData) => {
      if (result) {
        this.elementPool = [];
        if (result.selectedCustom && result.selectedCustom !== '') {
          this.elementPool.push({
            name: result.selectedCustom,
            categoryId: this.customCategoryId,
            icon: 'highlighter',
            isSelected: false,
            styleClass: 'more',
            color: 'black'
          });
          this.custom = result.selectedCustom;
        }
        if (result.selectedCategories && result.selectedCategories.length > 0) {
          this.categories
            .filter(cat =>
              result.selectedCategories.some(scat => scat === cat.categoryId)
            )
            .forEach(cat => this.elementPool.push(cat));
          this.selectionMade.emit(
            this.elementPool.some(elem => elem.isSelected)
          );
        }
        this.elementPool.forEach(elem => (elem.isSelected = true));
        if (this.elementPool.length === 0) {
          this.topElements.forEach(elem => this.elementPool.push(elem));
          this.elementPool.forEach(elem => (elem.isSelected = false));
        }
      }
    });
  }

  onToggle(element) {
    element.isSelected = !element.isSelected;
    this.selectionMade.emit(this.elementPool.some(elem => elem.isSelected));
  }
}
