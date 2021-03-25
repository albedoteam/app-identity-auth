import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/services/snack-bar.service';
import { TokenService } from './token.service';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokens: TokenService,
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
    else {
      this.tokens.loadAccount();
    }
  }
}
