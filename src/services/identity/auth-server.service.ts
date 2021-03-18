import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paged } from '../models/paged-type.model';
import { AuthServerModel } from './models/auth-server.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServerService {

  private server: BehaviorSubject<AuthServerModel | null>;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.server = new BehaviorSubject<AuthServerModel | null>(null);
  }

  public authServerAsync = (): Observable<AuthServerModel | null> => this.server.asObservable();

  public requestAuthServer(accountId: string): void {
    this.http.get<Paged<AuthServerModel>>(`${environment.identity}/AuthServer?accountId=${accountId}&pageSize=1&page=1`).subscribe(
      pagedAuthServer => {
        if (pagedAuthServer.recordsInPage == 1)
          this.server.next(pagedAuthServer.items[0]);
        else {
          this.server.next(null);
          this.router.navigate(['/error', '401']);
        }
      },
      (error) => {
        this.server.next(null);
        this.router.navigate(['/error', '401']);
      }
    )
  }
}
