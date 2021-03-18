import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/services/loading.service';
import { RedirectService } from './redirect.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private redirect: RedirectService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        if (params.account)
          this.redirect.setAccountId(params.account);
        else {
          this.router.navigate(["/error/401"]);
          return;
        }

        if (params.callbackUrl)
          this.redirect.setCallbackUrl(params.callbackUrl);
        else {
          this.router.navigate(["/error/401"]);
          return;
        }

        this.redirect.load();
      }
    );
  }
}
