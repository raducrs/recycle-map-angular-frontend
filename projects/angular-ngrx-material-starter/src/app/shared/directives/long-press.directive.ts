import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import * as Hammer from 'hammerjs';
import { HammerManager } from '@angular/material/core';

// https://github.com/wbhob/ionic-long-press/blob/master/src/directives/long-press.directive.ts

@Directive({
  selector: '[anmsLongPress]'
})
export class LongPressDirective implements OnInit, OnDestroy {
  @Input() interval: number;

  @Output() pressed: EventEmitter<any> = new EventEmitter();
  @Output() longPressed: EventEmitter<any> = new EventEmitter();
  @Output() pressEnded: EventEmitter<any> = new EventEmitter();

  private readonly el: HTMLElement;
  private _hammer: HammerManager;
  private int: number;

  constructor(public zone: NgZone, el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.interval) this.interval = 500;
    if (this.interval < 40) {
      throw new Error(
        "A limit of 40ms is imposed so you don't destroy device performance. If you need less than a 40ms interval, please file an issue explaining your use case."
      );
    }

    this._hammer = new Hammer.Manager(this.el, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
        [Hammer.Press],
        [Hammer.Tap]
      ]
    });

    this._hammer.on('pan', (e: any) => {
      this.onPressEnd();
    });

    this._hammer.on('press', (e: any) => {
      this.pressed.emit(e);
      this.clearInt();
      this.int = setInterval(() => {
        this.longPressed.emit(e);
      }, this.interval) as any;
    });

    this._hammer.on('pressup', (e: any) => {
      this.onPressEnd();
    });

    this._hammer.on('release', (e: any) => {
      this.onPressEnd();
    });

    this.el.addEventListener('mouseleave', (e: any) => {
      this.onPressEnd();
    });

    this.el.addEventListener('mouseout', (e: any) => {
      this.onPressEnd();
    });
  }

  clearInt(): void {
    if (this.int !== undefined) {
      clearInterval(this.int);
      this.int = undefined;
    }
  }

  onPressEnd(): void {
    this.clearInt();
    this.pressEnded.emit();
  }

  ngOnDestroy(): void {
    this.onPressEnd();
    if (this._hammer) {
      // this._hammer.destroy(); // @TODO check this
      this._hammer = null;
    }
  }
}
