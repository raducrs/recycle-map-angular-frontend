import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { autocomplete } from '../../../core/autocomplete/autocomplete';
import { SearchHint } from '../interfaces/search-hint';
import { MapSearchService } from '../map-search.service';
import {availableDisplayCards} from '../../catalog/catalog/catalog.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'anms-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent implements OnInit, OnChanges {
  @Input()
  focusLost = false;

  searchTerm = '';

  term$ = new BehaviorSubject<string>('');

  showHints = false;

  searchHints: Observable<SearchHint[]>;
  categoryHints: Observable<any[]>;

  filterActive = false;
  showFilterOptions = false;
  placeHolderValue;

  constructor(private searchService: MapSearchService, private route: ActivatedRoute) {
    const filter = this.route.snapshot.queryParamMap.get('filter') || '';
    const catIds = filter.split(',');
    this.searchService.removeAllFilters();
    catIds.filter(catId => catId.length > 0).forEach( catId => this.searchService.addFilter(Number(catId)));
  }

  ngOnInit(): void {
    this.searchHints = this.term$.pipe(
      autocomplete(200, term => this.searchService.fetchSearchHints(term))
    );

    this.categoryHints = this.term$.pipe(
      autocomplete(200, term => this.searchService.fetchCategoryHints(term))
    );

    this.searchService.activeFilterObserver().subscribe( activeFilter => {
      this.filterActive = activeFilter;
      if (activeFilter){
        const activeCat = this.searchService.getFilter();
        const firstId = activeCat[0];
        const activeCard = availableDisplayCards.filter(cat => cat.id === ('' + firstId))[0];
        this.placeHolderValue = 'Cauta ' + activeCard.title;
        if (activeCat.length > 1){
          this.placeHolderValue += ' si inca ' + (activeCat.length - 1) + ' ' + (activeCat.length - 1 > 1 ? 'categorii' : 'categorie' );
        }
      } else {
        this.placeHolderValue = 'Cauta';
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.focusLost.currentValue) {
      this.showHints = false;
      this.showFilterOptions = false;
    }
  }

  searchHint(term: string) {
    this.searchTerm = term;
    this.term$.next(term);
    this.showHints = true;
    this.showFilterOptions = false;
  }

  clearSearch() {
    this.searchTerm = '';
    this.showHints = false;
    this.showFilterOptions = false;
  }

  search() {
    this.showHints = true;
    this.showFilterOptions = false;
  }

  hintSelected(hint) {
    this.searchTerm = hint.description;
    this.showHints = false;
    this.showFilterOptions = false;
  }

  searchBarFocused() {
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.showHints = true;
      this.showFilterOptions = false;
      this.term$.next(this.searchTerm);
    }
  }

  toggleFilterShow(){
    this.showHints = false;
    this.showFilterOptions = !this.showFilterOptions;
  }

  filterIsActive(category){
    return this.searchService.getFilter().some(cat => cat === category.categoryId);
  }

  categorySelected(category){
    if (this.searchService.isFilterActive(category.categoryId)){
      this.searchService.removeFilter(category.categoryId);
    } else {
      this.searchService.addFilter(category.categoryId);
    }
    this.clearSearch();
  }
}
