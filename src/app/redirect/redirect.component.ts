import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/api/accounts/account.service';
import { AuthServerService } from 'src/api/identity/auth-server.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private authServer: AuthServerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.account)
          this.accountService.setAccount(params.account);
      }
    );

    this.accountService.accountIdAsync().subscribe(
      id => {
        if (id) {
          this.authServer.requestAuthServer(id)
        }
      }
    );

    this.authServer.authServerAsync().subscribe(
      server => {
        if (server) {
          this.router.navigate(['/auth', '', '']);
        }
      }
    )
  }
}
