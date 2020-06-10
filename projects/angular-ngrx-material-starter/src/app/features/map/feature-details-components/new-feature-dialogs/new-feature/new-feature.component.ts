import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-new-feature',
  templateUrl: './new-feature.component.html',
  styleUrls: ['./new-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewFeatureComponent implements OnInit {
  @Output() noClicked: EventEmitter<any> = new EventEmitter<any>();
  private navigationState: { [p: string]: any };

  constructor(private router: Router) {
    this.navigationState = this.router.getCurrentNavigation()?.extras?.state;
  }

  ngOnInit(): void {}

  onNoClick() {
    if (this.navigationState) {
      this.router.navigate(['/map'], {
        queryParams: {
          lat: this.navigationState.lat,
          lon: this.navigationState.lon,
          zoom: this.navigationState.zoom
        }
      });
    } else {
      // @TODO error when navigation is loaded here directly
      this.noClicked.emit({});
    }
  }
}
