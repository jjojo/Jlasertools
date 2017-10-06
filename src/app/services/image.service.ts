import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ImageService {

  constructor() { }

  private brightness = new Subject<any>();

  brightness$ = this.brightness.asObservable();

  setBrightness( value ) {
    this.brightness.next( value );
  }

}
