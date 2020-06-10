import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CardContent } from './card-content';

export interface CatalogSourceWrapper {
  cardContent?: CardContent;
  isAd?: boolean;
}

export class CatalogDataSource extends DataSource<
  CatalogSourceWrapper | undefined
> {
  private _length = 1000;
  private _pageSize = 5;
  private _cachedData;
  private _fetchedPages = new Set<number>();
  private _dataStream;
  private _subscription = new Subscription();

  displayCards: CardContent[] = [
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

  constructor() {
    super();
    this.initialSearch();
  }

  private initialSearch() {
    this._length = 100;
    this._cachedData = Array.from<CatalogSourceWrapper>({
      length: this._length
    });
    this._dataStream = new BehaviorSubject<
      (CatalogSourceWrapper | undefined)[]
    >(this._cachedData);
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<(CatalogSourceWrapper | undefined)[]> {
    this._subscription.add(
      collectionViewer.viewChange.subscribe(range => {
        const startPage = this._getPageForIndex(range.start);
        const endPage = this._getPageForIndex(range.end - 1);
        for (let i = startPage; i <= endPage; i++) {
          this._fetchPage(i);
        }
      })
    );
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      this._cachedData.splice(
        page * this._pageSize,
        this._pageSize,
        ...this.fetcDataFake()
      );
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }

  fetcDataFake() {
    const result = [];
    for (let i = 0; i < this._pageSize - 1; i++) {
      const index = Math.floor(Math.random() * this.displayCards.length);
      result.push({ cardContent: this.displayCards[index] });
    }
    result.push({});
    return result;
  }
}
