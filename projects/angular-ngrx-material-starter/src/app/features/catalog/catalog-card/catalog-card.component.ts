import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CardContent } from '../card-content';

@Component({
  selector: 'anms-catalog-card',
  templateUrl: './catalog-card.component.html',
  styleUrls: ['./catalog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogCardComponent implements OnInit {
  @Input() cardContent: CardContent = {
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
  };

  @ViewChild('card', { read: ElementRef }) card: ElementRef;

  optionsOpened = false;
  followClick = false;

  constructor() {}

  ngOnInit(): void {}

  getIconForType(type: string) {
    switch (type) {
      case 'recycable':
        return 'recycle';
      case 'ong':
        return 'hand-holding-heart';
      default:
        return 'recycle';
    }
  }

  cardClicked() {
    // console.log('state', this.card ? this.isVisible(this.card.nativeElement ) : false);
  }

  isVisible(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }
}
