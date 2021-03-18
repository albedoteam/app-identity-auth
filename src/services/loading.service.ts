import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private data: { [key: string]: BehaviorSubject<boolean> };

  constructor() {
    this.data = {};
  }

  public setLoading(key: string, value: boolean): void {
    if (this.data[key] == undefined)
      this.data[key] = new BehaviorSubject<boolean>(false);

    this.data[key].next(value);
  }

  public loadingAsync(key: string): Observable<boolean> {
    if (this.data[key] == undefined)
      this.data[key] = new BehaviorSubject<boolean>(false);

    return this.data[key].asObservable();
  }
}
