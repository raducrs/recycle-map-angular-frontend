import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class LongDirectiveConfigService extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    if (window) {
      const mc = new (<any>window).Hammer(element);

      for (const eventName in this.overrides) {
        if (eventName) {
          mc.get(eventName).set(this.overrides[eventName]);
        }
      }
      return mc;
    }
    return null;
  }
}
