import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paged } from '../base/paged-type.model';
import { AuthServerModel } from './models/auth-server.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServerService {

  private server: BehaviorSubject<AuthServerModel | null>;

  constructor(
    private http: HttpClient
  ) {

    this.server = new BehaviorSubject<AuthServerModel | null>(null);
  }

  public authServerAsync = (): Observable<AuthServerModel | null> => this.server.asObservable();

  public requestAuthServer(accountId: string): void {
    this.http.get<Paged<AuthServerModel>>(`${environment.identity}/AuthServer?pageSize=1&page=1`).subscribe(
      pagedAuthServer => {
        if (pagedAuthServer.items.length > 0)
          this.server.next(pagedAuthServer.items[0]);
      }
    )
  }
}
