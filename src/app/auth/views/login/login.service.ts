import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from 'src/api/accounts/account.service';
import { AuthServerService } from 'src/api/identity/auth-server.service';
import { AuthServerModel } from 'src/api/identity/models/auth-server.model';

@Injectable({
  providedIn: 'any'
})
export class LoginService {

  private server: AuthServerModel | null = null;

  constructor(
    private authServers: AuthServerService,
    private accounts: AccountService,
  ) {
    this.authServers.authServerAsync().subscribe(
      authServer => {
        if (authServer)
          this.server = authServer;
      }
    );
  }
}
