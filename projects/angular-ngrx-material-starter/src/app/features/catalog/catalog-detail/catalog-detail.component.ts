import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {availableDisplayCards} from '../catalog/catalog.component';
import {CardContent} from '../card-content';

@Component({
  selector: 'anms-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogDetailComponent implements OnInit {

  cardDisplay: CardContent;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.cardDisplay = availableDisplayCards[id];
  }

  ngOnInit(): void {
  }

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

  goBack() {
    // @TODO fix goback to recreate list in position
    this.router.navigate(['/catalog']);
  }

  goToMap(){
    this.router.navigate(['map'], {queryParams: { filter: this.cardDisplay.id}});
  }

}
