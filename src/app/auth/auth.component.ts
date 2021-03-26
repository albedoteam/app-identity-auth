import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'at-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private auths: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.keys.length > 0) {
      this.router.navigate([],
        {
          queryParams: null,
          replaceUrl: true
        });
    }

    this.auths.loadAccount();
  }
}
