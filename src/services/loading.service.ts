import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingEnum } from './models/loading.enum';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private data: { [key: string]: BehaviorSubject<boolean> };

  constructor() {
    this.data = {};
  }

  public loading(key: LoadingEnum, value: boolean): void {
    if (this.data[key] == undefined)
      this.data[key] = new BehaviorSubject<boolean>(false);

    this.data[key].next(value);
  }

  public loadingAsync(key: LoadingEnum): Observable<boolean> {
    if (this.data[key] == undefined)
      this.data[key] = new BehaviorSubject<boolean>(false);

    return this.data[key].asObservable();
  }
}
