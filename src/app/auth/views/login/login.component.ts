import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'at-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private title: Title,
    private sessions: SessionService,
  ) {

  }

  ngOnInit(): void {
    this.sessions.accountNameAsync().subscribe(
      accountName => {
        if (accountName)
          this.title.setTitle(`${accountName} - Login`);
      }
    );
  }
}
