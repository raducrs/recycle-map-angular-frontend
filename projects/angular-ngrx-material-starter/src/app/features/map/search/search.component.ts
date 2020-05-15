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

@Component({
  selector: 'anms-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnChanges {
  @Input()
  focusLost = false;

  searchTerm = '';

  term$ = new BehaviorSubject<string>('');

  showHints = false;

  searchHints: Observable<SearchHint[]>;

  constructor(private searchService: MapSearchService) {}

  ngOnInit(): void {
    this.searchHints = this.term$.pipe(
      autocomplete(200, term => this.searchService.fetchSearchHints(term))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.focusLost.currentValue) {
      this.showHints = false;
    }
  }

  searchHint(term: string) {
    this.searchTerm = term;
    this.term$.next(term);
    this.showHints = true;
  }

  clearSearch() {
    this.searchTerm = '';
    this.showHints = false;
  }

  search() {
    this.showHints = true;
  }

  hintSelected(hint) {
    this.searchTerm = hint.description;
    this.showHints = false;
  }

  searchBarFocused() {
    if (this.searchTerm && this.searchTerm.length > 0) {
      this.showHints = true;
      this.term$.next(this.searchTerm);
    }
  }
}
