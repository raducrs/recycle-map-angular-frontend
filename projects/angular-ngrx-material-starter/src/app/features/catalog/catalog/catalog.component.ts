import {ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {CardContent} from '../card-content';

export interface CatalogSourceWrapper {
  cardContent?: CardContent;
  isAd?: boolean;
}

export const availableDisplayCards: CardContent[] = [
  {
    id: '0',
    title: 'Hartie / Carton',
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
    id: '1',
    title: 'Plastic',
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
    id: '2',
    title: 'Sticla',
    description:
      "Some quick example text to build on the card title and make up the bulk of the card's\n" +
      '      content. long long text long long text long long text. twice as long and growing longer maybe someday\n' +
      '    will be even three times bigger',
    stats: '1234',
    type: 'recycle',
    color: 'orange-1',
    img: 'https://mdbootstrap.com/img/Photos/Others/food.jpg'
  },
  {
    id: '3',
    title: 'Donatie haine',
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
// @TODO better infinite scroll
// https://netbasal.com/build-an-infinite-scroll-component-in-angular-a9c16907a94d
// https://github.com/orizens/ngx-infinite-scroll
// https://www.c-sharpcorner.com/article/implement-infinite-scrolling-using-angular-6/
// * https://codeburst.io/angular-2-simple-infinite-scroller-directive-with-rxjs-observables-a989b12d4fb1

@Component({
  selector: 'anms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatalogComponent implements OnInit, OnDestroy {


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
        Math.random() * availableDisplayCards.length
      );
      result.push({
        cardContent: availableDisplayCards[index],
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
