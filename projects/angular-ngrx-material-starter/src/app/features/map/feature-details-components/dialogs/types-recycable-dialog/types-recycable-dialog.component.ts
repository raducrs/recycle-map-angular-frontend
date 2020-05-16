import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'anms-types-recycable-dialog',
  templateUrl: './types-recycable-dialog.component.html',
  styleUrls: ['./types-recycable-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypesRecycableDialogComponent implements OnInit {
  searchTerm = '';
  custom = { name: '', isSelected: false };
  selectedCategories: any[] = [];
  filteredElements: any[] = [];

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

  allElements: any[] = [
    {
      name: 'Hartie/Carton',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'yellow',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Plastic (PET)',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 1,
      color: 'blue',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Sticla',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 2,
      color: 'red',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Baterii/pile',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 3,
      color: 'purple',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Becuri/neoane',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 4,
      color: 'purple',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Plastic (PP)',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 5,
      color: 'grey',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Plastic dur',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 6,
      color: 'grey',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Reciclare textile',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 7,
      color: 'grey',
      isCategory: true,
      icon: 'recycle'
    },
    {
      name: 'Donatie haine',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 8,
      color: 'grey',
      isCategory: true,
      icon: 'hand-holding-heart'
    },
    {
      name: 'Donatie carti',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 9,
      color: 'grey',
      isCategory: true,
      icon: 'hand-holding-heart'
    },
    {
      name: 'Carton',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'yellow',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Sticla plastic',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 1,
      color: 'yellow',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Acumulatori',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 3,
      color: 'purple',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Baterii',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 3,
      color: 'purple',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Pile',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 3,
      color: 'purple',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Plastic',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 6,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Recipiente polipelina (PP)',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 5,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'PP',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 5,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Foi',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Carti',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Carti',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 9,
      color: 'grey',
      isCategory: false,
      icon: 'hand-holding-heart'
    },
    {
      name: 'Manuale',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Manuale',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 9,
      color: 'grey',
      isCategory: false,
      icon: 'hand-holding-heart'
    },
    {
      name: 'Caiet',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 0,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Haine',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 7,
      color: 'grey',
      isCategory: false,
      icon: 'recycle'
    },
    {
      name: 'Haine',
      isSelected: false,
      styleClass: 'pregenerated',
      categoryId: 8,
      color: 'grey',
      isCategory: false,
      icon: 'hand-holding-heart'
    }
  ];

  constructor(private dialogRef: MatDialogRef<TypesRecycableDialogComponent>) {}

  ngOnInit(): void {
    this.filteredElements = this.allElements.filter(elem => elem.isCategory);
  }

  changeFilter(searchTerm) {
    if (searchTerm === '') {
      this.clearFilter();
      return;
    }

    this.searchTerm = searchTerm;

    // @TODO server side logic
    const filterSearchResults = this.filterOfSearchTerm();
    const possibleCategories = filterSearchResults.map(elem => elem.categoryId);
    const categoriesResult = this.categories.filter(cat =>
      possibleCategories.some(pcat => pcat === cat.categoryId)
    );

    this.filteredElements = this.allElements
      .filter(
        elem =>
          elem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
          categoriesResult.some(cat => cat.categoryId === elem.categoryId)
      )
      .filter(elem => this.filterElemByCategory(elem))
      .filter(elem => elem.isCategory);
  }

  filterOfSearchTerm() {
    return this.allElements
      .filter(elem => this.filterElemBySearchTerm(elem, this.searchTerm))
      .filter(elem => this.filterElemByCategory(elem));
  }

  private filterElemBySearchTerm(elem, searchTerm: any) {
    return elem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0; // @TODO case insensitive search optimized
  }

  // private filterElemBySelected(elem) {
  //   return !this.selectedElements.some(el => el.name === elem.name);
  // }

  clearFilter() {
    this.searchTerm = '';
    this.filteredElements = this.allElements
      .filter(elem => elem.isCategory)
      .filter(elem => this.filterElemByCategory(elem));
  }

  private filterElemByCategory(elem) {
    return !this.selectedCategories.some(
      cat => cat.categoryId === elem.categoryId
    );
  }

  onToggleCustom() {
    this.custom.isSelected = !this.custom.isSelected;
    if (this.custom.isSelected) {
      this.custom.name = this.searchTerm;
    }
    // @TODO add only if not available
  }

  onUnselect(element) {
    element.isSelected = false;
    this.selectedCategories = this.selectedCategories.filter(
      cat => cat.categoryId !== element.categoryId
    );
    this.changeFilter(this.searchTerm);
  }

  onSelect(element) {
    const elemCat = this.categories.filter(
      cat => cat.categoryId === element.categoryId
    )[0];
    elemCat.isSelected = true;
    this.selectedCategories.push(elemCat);
    this.changeFilter(this.searchTerm);
  }

  onNoClick() {}

  onYesClick() {}
}
