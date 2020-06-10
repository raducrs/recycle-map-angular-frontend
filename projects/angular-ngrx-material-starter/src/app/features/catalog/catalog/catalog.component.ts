import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  OnDestroy
} from '@angular/core';
import { CardContent } from '../card-content';
import {
  CatalogDataSource,
  CatalogSourceWrapper
} from '../catalog-data-source';
import { DataSource } from '@angular/cdk/collections';
import {
  FixedSizeVirtualScrollStrategy,
  VIRTUAL_SCROLL_STRATEGY
} from '@angular/cdk/scrolling';

@Component({
  selector: 'anms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
  // providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: FixedSizeVirtualScrollStrategy}]
})
export class CatalogComponent implements OnInit, OnDestroy {
  availableDisplayCards: CardContent[] = [
    {
      id: '0',
      title: 'Card title long long long long long long',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's\n" +
        '      content. long long text long long text long long text. twice as long and growing longer maybe someday\n' +
        '    will be even three times bigger',
      stats: '1234',
      type: 'recycle',
      color: 'red-1',
      img: 'https://mdbootstrap.com/img/Photos/Others/food.jpg'
    },
    {
      id: '0',
      title: 'Hartie',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's\n" +
        '      content. long long text long long text long long text. twice as long and growing longer maybe someday\n' +
        '    will be even three times bigger',
      stats: '1234',
      type: 'recycle',
      color: 'light-blue-1',
      img: 'https://mdbootstrap.com/img/Photos/Others/food.jpg'
    },
    {
      id: '0',
      title: 'Plastic',
      description:
        "Some quick example text to build on the card title and make up the bulk of the card's\n" +
        '      content. long long text long long text long long text. twice as long and growing longer maybe someday\n' +
        '    will be even three times bigger',
      stats: '1234',
      type: 'recycle',
      color: 'orange-1',
      img: 'https://mdbootstrap.com/img/Photos/Others/food.jpg'
    }
  ];

  displayCards: CatalogSourceWrapper[] = [];

  resultsSize = 43;
  fetched = 0;
  pageSize = 10;

  smallScreen;

  scrollEvent = (event: Event): void => {
    const src = (event.target as unknown) as {
      scrollTop: number;
      scrollHeight: number;
    };
    if (this.fetched < this.resultsSize) {
      if (src.scrollTop > src.scrollHeight - 4 * 400) {
        if (this.resultsSize - this.fetched >= this.pageSize) {
          this.displayCards.push(...this.fetchDataFake(this.pageSize));
          this.displayCards = [...this.displayCards];
        } else {
          this.displayCards.push(
            ...this.fetchDataFake(this.resultsSize - this.fetched)
          );
          this.displayCards = [...this.displayCards];
        }
      }
    }
  };

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    // does not work since we are scrolling in element
  }

  constructor() {
    this.smallScreen = window.innerWidth < 768;
    this.pageSize = this.smallScreen ? (window.innerWidth < 576 ? 4 : 6) : 10;
  }

  ngOnInit(): void {
    this.displayCards.push(...this.fetchDataFake(this.pageSize));
    // https://stackoverflow.com/questions/44516017/how-to-handle-window-scroll-event-in-angular-4
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  fetchDataFake(left: number) {
    const result = [];
    for (let i = 0; i < left; i++) {
      const index = Math.floor(
        Math.random() * this.availableDisplayCards.length
      );
      result.push({
        cardContent: this.availableDisplayCards[index],
        isAd: false
      });
    }
    this.fetched += left;
    if (left > this.pageSize / 2) {
      result.push({ isAd: true });
    }
    return result;
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  showAds() {}
}
