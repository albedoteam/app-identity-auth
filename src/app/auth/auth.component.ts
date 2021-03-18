import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/services/accounts/account.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'at-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private auths: AuthService
  ) {

  }

  ngOnInit() {
    this.auths.validate();
  }
}
