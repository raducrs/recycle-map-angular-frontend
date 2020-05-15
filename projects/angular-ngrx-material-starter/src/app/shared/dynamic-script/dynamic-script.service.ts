import { Injectable } from '@angular/core';
import { Script } from './script';

declare var document: any;

/*
  Based on https://stackoverflow.com/a/42766146
 */

@Injectable()
export class DynamicScriptService {
  private scripts: any = {};

  private predefinedScripts: Script[] = [];

  constructor() {
    this.predefinedScripts.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: Script[]) {
    const promises: any[] = [];
    scripts.forEach(script =>
      promises.push(this.loadScript(script['name'], script['src']))
    );
    return Promise.all(promises);
  }

  loadScript(name: string, src: string) {
    return new Promise((resolve, reject) => {
      this.scripts[name].src = src;
      // resolve if already loaded
      if (this.scripts[name] && this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {
          // IE
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {
          // Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Failed' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }
}
